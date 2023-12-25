import { useState, useEffect } from 'react';
import { client } from "../../tina/__generated__/client";
import ResponsiveCard from './ResponsiveCard';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    let fetchedArticles = [];
    try {
      const articlesResponse = await client.queries.articleConnection();
      const edges = articlesResponse.data.articleConnection?.edges ?? [];

      fetchedArticles = edges.reduce((acc, edge) => {
        if (edge && edge.node) {
          acc.push({
            thumbnail: edge.node.thumbnail ?? null,
            date: edge.node.date ?? null,
            author: edge.node.author ?? null,
            description: edge.node.description ?? null,
            categories: edge.node.categories ?? null,
            title: edge.node.title ?? "",
            slug: edge.node.slug ?? "",
          });
        }
        return acc;
      }, []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Handle error as appropriate
    }
    setArticles(fetchedArticles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto space-y-6 p-8">
      {articles.map((article, index) => (
        <ResponsiveCard
          key={index}
          client:load
          imageUrl={article.thumbnail}
          title={article.title}
          content={article.description}
          slug={article.slug}
        />
      ))}
    </div>
  );
};

export default ArticleList;
