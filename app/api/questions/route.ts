import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET ALL QUESTIONS
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;

    const whereClause: any = {
      isDeleted: false,
    };

    // Filter by tag if provided
    if (tag) {
      whereClause.questionTags = {
        some: {
          tag: {
            name: tag
          }
        }
      };
    }

    // Search in title and description if provided
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const questions = await prisma.question.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            reputation: true
          }
        },
        questionTags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        answers: {
          select: {
            id: true,
            isAccepted: true
          }
        },
        _count: {
          select: {
            answers: true
          }
        }
      },
      orderBy: {
        [sortBy]: order as 'asc' | 'desc'
      },
      skip,
      take: limit
    });

    // Get total count for pagination
    const totalCount = await prisma.question.count({
      where: whereClause
    });

    // Format response data
    const formattedQuestions = questions.map(question => ({
      id: question.id,
      title: question.title,
      description: question.description,
      author: question.author,
      tags: question.questionTags.map(qt => qt.tag),
      votes: 0, // You'll need to implement vote counting
      answers: question._count.answers,
      views: question.views,
      hasAcceptedAnswer: question.answers.some(answer => answer.isAccepted),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt
    }));

    return NextResponse.json({
      questions: formattedQuestions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST NEW QUESTION
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, attempt, authorId, tags } = body;

    // Validate required fields
    if (!title || !description || !attempt || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, attempt, authorId' },
        { status: 400 }
      );
    }

    // Validate title length
    if (title.length > 255) {
      return NextResponse.json(
        { error: 'Title must be 255 characters or less' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: authorId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create question with tags
    const question = await prisma.question.create({
      data: {
        title,
        description,
        attempt,
        authorId,
        questionTags: tags && tags.length > 0 ? {
          create: await Promise.all(
            tags.map(async (tagName: string) => {
              // Find or create tag
              const tag = await prisma.tag.upsert({
                where: { name: tagName.toLowerCase() },
                update: {},
                create: {
                  name: tagName.toLowerCase(),
                  description: `Questions related to ${tagName}`
                }
              });
              return { tagId: tag.id };
            })
          )
        } : undefined
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            reputation: true
          }
        },
        questionTags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    // Format response
    const formattedQuestion = {
      id: question.id,
      title: question.title,
      description: question.description,
      attempt: question.attempt,
      author: question.author,
      tags: question.questionTags.map(qt => qt.tag),
      votes: 0,
      answers: 0,
      views: question.views,
      hasAcceptedAnswer: false,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt
    };

    return NextResponse.json(
      { question: formattedQuestion, message: 'Question created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}

