// "use client";

// import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Color } from "@tiptap/extension-color";
// import Highlight from "@tiptap/extension-highlight";
// import ListItem from "@tiptap/extension-list-item";
// import TextAlign from "@tiptap/extension-text-align";
// import Image from "@tiptap/extension-image";
// import TextStyle from "@tiptap/extension-text-style";
// import MenuBar from "./MenuBar";
// import { forwardRef, useImperativeHandle } from "react";

// export interface TiptapEditorProps {
//   initialContent?: string | JSONContent;
//   onUpdate?: (content: string) => void;
//   className?: string;
// }

// export interface TiptapEditorRef {
//   clearContent: () => void;
// }

// const extensions = [
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle,
//   Highlight,
//   TextAlign.configure({
//     types: ["heading", "paragraph"],
//   }),
//   Image,
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//   }),
// ];

// const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
//   ({ initialContent = "", onUpdate, className = "" }, ref) => {
//     const editor = useEditor({
//       extensions,
//       content: initialContent,
//       onUpdate: ({ editor }) => {
//         const html = editor.getHTML();
//         onUpdate?.(html); // Call the callback with updated content
//       },
//       editorProps: {
//         attributes: {
//           class: `min-h-[200px] cursor-text rounded-md border p-6 ${className}`,
//         },
//       },
//       immediatelyRender: false,
//     });

//     useImperativeHandle(ref, () => ({
//       clearContent: () => {
//         editor?.commands.clearContent();
//         onUpdate?.("");
//       },
//     }));

//     if (!editor) return null;

//     return (
//       <div className="w-full space-y-4">
//         <MenuBar editor={editor} />
//         <div className="max-h-[400px] overflow-y-scroll">
//           <EditorContent editor={editor} />
//         </div>
//       </div>
//     );
//   }
// );

// TiptapEditor.displayName = "TiptapEditor";

// export default TiptapEditor;

"use client";

import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import MenuBar from "./MenuBar";
import { forwardRef, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";

export interface TiptapEditorProps {
  initialContent?: string | JSONContent;
  onUpdate?: (content: string) => void;
  className?: string;
  containerClassName?: string;
  minHeight?: string;
  maxHeight?: string;
}

export interface TiptapEditorRef {
  clearContent: () => void;
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  Underline,
  Highlight,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Image,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (
    {
      initialContent = "",
      onUpdate,
      className = "",
      containerClassName = "",
      minHeight = "300px",
      maxHeight = "600px",
    },
    ref
  ) => {
    const editor = useEditor({
      extensions,
      content: initialContent,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onUpdate?.(html);
      },
      editorProps: {
        attributes: {
          class: cn(
            "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none",
            className
          ),
        },
      },
      immediatelyRender: false,
    });

    useImperativeHandle(ref, () => ({
      clearContent: () => {
        editor?.commands.clearContent();
        onUpdate?.("");
      },
    }));

    if (!editor) return null;

    return (
      <div
        className={cn(
          "flex flex-col w-full rounded-lg border bg-background",
          containerClassName
        )}
      >
        {/* Sticky menu bar */}
        <div className="sticky top-0 z-10 border-b bg-background">
          <div className="overflow-x-auto">
            <MenuBar editor={editor} />
          </div>
        </div>

        {/* Editor content with dynamic height */}
        <div
          className={cn(
            "flex-grow overflow-y-auto p-4",
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          )}
          style={{
            minHeight,
            maxHeight,
          }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
