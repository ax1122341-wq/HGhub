import { useState } from "react";

const items = [
  { id: 1, title: "城市漫游", category: "旅行", emoji: "🌆", desc: "发现城市里的精彩风景" },
  { id: 2, title: "周末料理", category: "生活", emoji: "🍳", desc: "简单又有趣的美食分享" },
  { id: 3, title: "科技新视野", category: "科技", emoji: "💻", desc: "探索有趣的科技知识" },
  { id: 4, title: "自然纪录", category: "纪录", emoji: "🌿", desc: "走进丰富多彩的自然世界" },
  { id: 5, title: "摄影日记", category: "生活", emoji: "📷", desc: "记录生活中的美好瞬间" },
  { id: 6, title: "世界旅行", category: "旅行", emoji: "✈️", desc: "一起探索不同的地方" },
];

export default function WebDemo() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");

  const filtered = items.filter((item) =>
    (category === "全部" || item.category === category) &&
    (item.title + item.desc).includes(search)
  );

  return (
    <div style={{ minHeight: "100vh", background: "#10121a", color: "white", fontFamily: "Arial, sans-serif" }}>
      <header style={{ padding: "20px 6%", borderBottom: "1px solid #30323c", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>HGhub Web Demo</h1>
        <nav style={{ display: "flex", gap: 24, color: "#ddd" }}>
          <span>首页</span><span>发现</span><span>分类</span>
        </nav>
      </header>

      <main style={{ maxWidth: 1200, margin: "auto", padding: "50px 6%" }}>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 14 }}>发现精彩内容</h2>
          <p style={{ color: "#aaa", marginBottom: 24 }}>一个使用模拟数据的独立网页演示版本</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索内容..."
            style={{ width: "100%", maxWidth: 450, padding: 14, borderRadius: 10, background: "#242734", color: "white", border: "1px solid #444" }}
          />
        </section>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
          {["全部", "旅行", "生活", "科技", "纪录"].map((name) => (
            <button key={name} onClick={() => setCategory(name)}
              style={{ padding: "10px 18px", borderRadius: 20, border: "none", cursor: "pointer", background: category === name ? "#e94b73" : "#292c38", color: "white" }}>
              {name}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }}>
          {filtered.map((item) => (
            <article key={item.id} style={{ background: "#20232e", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 190, display: "grid", placeItems: "center", background: "#34384b", fontSize: 70 }}>{item.emoji}</div>
              <div style={{ padding: 20 }}>
                <div style={{ color: "#ff8fa9", fontSize: 13 }}>{item.category}</div>
                <h3 style={{ fontSize: 20, margin: "10px 0" }}>{item.title}</h3>
                <p style={{ color: "#aaa", fontSize: 14 }}>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && <p style={{ color: "#aaa" }}>没有找到相关内容。</p>}
      </main>
    </div>
  );
}
