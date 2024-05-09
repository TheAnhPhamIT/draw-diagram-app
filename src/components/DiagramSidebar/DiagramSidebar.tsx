import "./DiagramSidebar.css";

export function DiagramSidebar() {
  return (
    <div className="diagram-sidebar">
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="comment">Comment</label>
        <textarea name="comment" id="comment" rows={5}></textarea>
      </form>
    </div>
  );
}
