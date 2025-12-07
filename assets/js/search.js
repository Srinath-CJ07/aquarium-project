import { Document } from "flexsearch";

const index = new Document({
  tokenize: "forward",
  document: {
    id: "url",
    index: [
      "title",
      "type",
      "subType", 
      "category",
      "subCategory",
      "name",
      "color",
      "dimensions",
      "size"
    ],
    store: [
      "title",
      "url",
      "type",
      "subType",
      "category", 
      "subCategory",
      "name"
    ],
  },
});

fetch("/index.json")
  .then((res) => res.json())
  .then((data) => {
    for (const page of data) {
      index.add(page);
    }
  })
  .catch((err) => console.error("Error loading search index:", err));

const input = document.getElementById("search");
const results = document.getElementById("results");

input?.addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  
  if (!query) {
    results.innerHTML = "";
    return;
  }

  const matches = await index.searchAsync(query, { 
    enrich: true,
    limit: 20
  });
  
  const flatMatches = matches.flatMap((group) => group.result);

  results.innerHTML = flatMatches.length
    ? flatMatches
        .filter((p) => p.doc && p.doc.url && p.doc.title)
        .map((p) => `<div><a href="${p.doc.url}">${p.doc.title}</a></div>`)
        .join("")
    : "<div>No results found</div>";
});
