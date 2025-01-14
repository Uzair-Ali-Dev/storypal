import MenuButton from "./MenuButton";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Highlighter,
  Image,
  Type,
  Underline,
} from "lucide-react";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className=" p-2">
      <div className="flex flex-wrap gap-1">
        {/* Text Styling Group */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <Bold size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <Italic size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            <Strikethrough size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          >
            <Underline size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
          >
            <Code size={16} />
          </MenuButton>
        </div>

        {/* Paragraph & Headings Group */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
          >
            <Type size={16} />
          </MenuButton>

          {([1, 2, 3, 4, 5, 6] as Array<1 | 2 | 3 | 4 | 5 | 6>).map((level) => (
            <MenuButton
              key={`H${level}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              isActive={editor.isActive("heading", { level })}
            >
              H{level}
            </MenuButton>
          ))}
        </div>

        {/* List Group */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            <List size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            <ListOrdered size={16} />
          </MenuButton>
        </div>

        {/* Blockquote & Image */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
          >
            <Quote size={16} />
          </MenuButton>

          <MenuButton onClick={addImage}>
            <Image size={16} />
          </MenuButton>
        </div>

        {/* Text Alignment & Highlight */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            disabled={
              !editor.can().chain().focus().setTextAlign("center").run()
            }
          >
            <AlignCenter size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={16} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive("highlight")}
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
          >
            <Highlighter size={16} />
          </MenuButton>
        </div>

        {/* Undo / Redo */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            Undo
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            Redo
          </MenuButton>
        </div>

        {/* Horizontal Rule & Hard Break */}
        <div className="flex gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Horizontal Rule
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            Hard Break
          </MenuButton>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
