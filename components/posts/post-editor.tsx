"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bold, Italic, Strikethrough } from "lucide-react";

interface PostEditorProps {
  defaultContent?: string;
  onChange: (content: string) => void;
}

const PostEditor = ({ onChange, defaultContent }: PostEditorProps) => {
  const [isEditable, setIsEditable] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] max-h-[340px] max-w-[720px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center">
            <Button
              type="button"
              variant={editor.isActive("bold") ? "default" : "secondary"}
              size="icon"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="rounded-r-none">
              <Bold size={16} />
            </Button>
            <Button
              type="button"
              variant={editor.isActive("italic") ? "default" : "secondary"}
              size="icon"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="rounded-none">
              <Italic size={16} />
            </Button>
            <Button
              type="button"
              variant={editor.isActive("strike") ? "default" : "secondary"}
              size="icon"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className="rounded-l-none">
              <Strikethrough size={16} />
            </Button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default PostEditor;
