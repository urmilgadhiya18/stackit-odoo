"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Smile,
  Code,
  X
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useCallback, useEffect, useRef } from 'react'

const lowlight = createLowlight(common)

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter your text here...",
  minHeight = "200px",
}: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const linkInputRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'my-bullet-list',
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'my-ordered-list',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'my-list-item',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-md my-2',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-100 rounded-md p-3 font-mono text-sm',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4',
        style: `min-height: ${minHeight};`,
      },
    },
  })

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
      if (linkInputRef.current && !linkInputRef.current.contains(event.target as Node)) {
        setShowLinkInput(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleStrike = useCallback(() => {
    editor?.chain().focus().toggleStrike().run()
  }, [editor])

  const toggleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run()
  }, [editor])

  const toggleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run()
  }, [editor])

  const toggleCodeBlock = useCallback(() => {
    editor?.chain().focus().toggleCodeBlock().run()
  }, [editor])

  const setTextAlign = useCallback((alignment: string) => {
    editor?.chain().focus().setTextAlign(alignment).run()
  }, [editor])

  const addLink = useCallback(() => {
    if (linkUrl.trim()) {
      const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`
      editor?.chain().focus().setLink({ href: url }).run()
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }, [editor, linkUrl])

  const removeLink = useCallback(() => {
    editor?.chain().focus().unsetLink().run()
    setShowLinkInput(false)
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      const imageUrl = url.startsWith('http') ? url : `https://${url}`
      editor?.chain().focus().setImage({ src: imageUrl }).run()
    }
  }, [editor])

  const addEmoji = useCallback((emoji: string) => {
    editor?.chain().focus().insertContent(emoji).run()
    setShowEmojiPicker(false)
  }, [editor])

  const commonEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😑', '😬', '🙄', '😯', '😦',
    '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴',
    '👍', '👎', '👌', '🤞', '✌️', '🤟', '🤘', '👈', '👉', '👆',
    '👇', '☝️', '✋', '🤚', '🖐', '🖖', '👋', '🤙', '💪', '🦾',
    '🙏', '✍️', '💄', '💋', '👄', '🦷', '👅', '👂', '🦻', '👃',
    '👣', '👁', '👀', '🫀', '🫁', '🧠', '🗣', '👤', '👥', '🫂'
  ]

  if (!editor) {
    return (
      <div className="border rounded-md p-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-2"></div>
        <div className="h-32 bg-gray-100 rounded"></div>
      </div>
    )
  }

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-3 flex flex-wrap gap-2 items-center">
        {/* Text Formatting */}
        <div className="flex gap-1">
          <Button
            variant={editor.isActive('bold') ? 'default' : 'outline'}
            size="sm"
            onClick={toggleBold}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('italic') ? 'default' : 'outline'}
            size="sm"
            onClick={toggleItalic}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('strike') ? 'default' : 'outline'}
            size="sm"
            onClick={toggleStrike}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Lists */}
        <div className="flex gap-1">
          <Button
            variant={editor.isActive('bulletList') ? 'default' : 'outline'}
            size="sm"
            onClick={toggleBulletList}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('orderedList') ? 'default' : 'outline'}
            size="sm"
            onClick={toggleOrderedList}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Text Alignment */}
        <div className="flex gap-1">
          <Button
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTextAlign('left')}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTextAlign('center')}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTextAlign('right')}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Code Block */}
        <Button
          variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
          size="sm"
          onClick={toggleCodeBlock}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300" />

        {/* Link */}
        <div className="relative" ref={linkInputRef}>
          <Button
            variant={editor.isActive('link') ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowLinkInput(!showLinkInput)}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          {showLinkInput && (
            <div className="absolute top-full mt-2 left-0 z-50 min-w-80 p-3 bg-white border rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  type="url"
                  placeholder="Enter URL (e.g., google.com)"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addLink()
                    }
                    if (e.key === 'Escape') {
                      setShowLinkInput(false)
                    }
                  }}
                  autoFocus
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowLinkInput(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={addLink} disabled={!linkUrl.trim()}>
                  Add Link
                </Button>
                {editor.isActive('link') && (
                  <Button size="sm" variant="destructive" onClick={removeLink}>
                    Remove Link
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Image */}
        <Button
          variant="outline"
          size="sm"
          onClick={addImage}
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        {/* Emoji */}
        <div className="relative" ref={emojiPickerRef}>
          <Button
            variant={showEmojiPicker ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Add Emoji"
          >
            <Smile className="h-4 w-4" />
          </Button>
          {showEmojiPicker && (
            <div className="absolute top-full mt-2 left-0 z-50 p-1 bg-white border rounded-lg shadow-lg">
              <div className="w-24 max-h-30 overflow-y-auto">
                <div className="grid grid-cols-4 gap-0">
                  {commonEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      className=" text-lg hover:bg-gray-100 rounded transition-colors duration-150"
                      onClick={() => addEmoji(emoji)}
                      title={`Add ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[200px] bg-white">
        <style jsx global>{`
          .ProseMirror ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
            margin: 0.75rem 0 !important;
            list-style-position: outside !important;
          }
          .ProseMirror ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
            margin: 0.75rem 0 !important;
            list-style-position: outside !important;
          }
          .ProseMirror li {
            margin: 0.25rem 0 !important;
            display: list-item !important;
            list-style-type: inherit !important;
          }
          .ProseMirror ul ul {
            list-style-type: circle !important;
          }
          .ProseMirror ul ul ul {
            list-style-type: square !important;
          }
          .ProseMirror ol ol {
            list-style-type: lower-alpha !important;
          }
          .ProseMirror ol ol ol {
            list-style-type: lower-roman !important;
          }
          /* Override any conflicting prose styles */
          .prose ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
          }
          .prose ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
          }
          .prose li {
            display: list-item !important;
            list-style-type: inherit !important;
          }
        `}</style>
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px]"
          style={{
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
          } as React.CSSProperties}
        />
      </div>
    </div>
  )
}