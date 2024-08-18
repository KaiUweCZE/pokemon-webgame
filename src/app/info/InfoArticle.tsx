import { articleData } from "./data/infoPageData";

interface InfoArticleProps {
  id: number;
}

const InfoArticle = ({ id }: InfoArticleProps) => {
  const article = articleData.find((item) => item.id === id);

  if (!article) return null;
  const headline = article.headline ?? "";
  const paragraphs = article.p ?? [];
  const lists = article.ul ?? [];

  return (
    <article>
      {<h2>{headline}</h2>}
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {lists && (
        <ul className="info-list">
          {lists.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default InfoArticle;
