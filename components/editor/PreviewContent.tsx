interface PreviewContentProps {
  content: string;
}

const PreviewContent: React.FC<PreviewContentProps> = ({ content }) => (
  <div
    className="TipTapPreview min-h-[150px] p-5 border rounded-md bg-gray-50"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default PreviewContent;
