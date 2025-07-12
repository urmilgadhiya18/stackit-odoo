import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET USER'S OWN QUESTIONS
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    // Validate required userId parameter
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const skip = (page - 1) * limit;

    const whereClause = {
      authorId: userId,
      isDeleted: false,
    };

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
      attempt: question.attempt,
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
      },
      user: {
        id: user.id,
        name: user.name,
        reputation: user.reputation
      }
    });

  } catch (error) {
    console.error('Error fetching user questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user questions' },
      { status: 500 }
    );
  }
}