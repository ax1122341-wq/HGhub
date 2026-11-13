import { useMemo, useState } from "react";

const items = [
  { id: 1, title: "午夜城市", category: "都市", year: "2026", score: "9.2", desc: "霓虹灯下，一座城市的故事正在展开。", color: "linear-gradient(135deg,#25133e,#a33b69,#f08a65)", tag: "热门推荐", icon: "🌃" },
  { id: 2, title: "远方的海", category: "旅行", year: "2026", score: "9.0", desc: "沿着海岸线，发现不一样的风景。", color: "linear-gradient(135deg,#102d50,#167b91,#83c9c2)", tag: "精选", icon: "🌊" },
  { id: 3, title: "未来实验室", category: "科技", year: "2025", score: "8.9", desc: "探索科技、创意与未来生活。", color: "linear-gradient(135deg,#101b43,#354b9c,#8d71c7)", tag: "新内容", icon: "🚀" },
  { id: 4, title: "山野日记", category: "纪录", year: "2026", score: "9.4", desc: "走进自然，记录山川与森林。", color: "linear-gradient(135deg,#173a2d,#43835b,#b5a66c)", tag: "高分内容", icon: "🏞️" },
  { id: 5, title: "周末厨房", category: "生活", year: "2025", score: "8.8", desc: "简单料理，让日常生活更有趣。", color: "linear-gradient(135deg,#562c20,#b66b42,#e8bd83)", tag: "轻松生活", icon: "🍳" },
  { id: 6, title: "光影之间", category: "艺术", year: "2026", score: "9.1", desc: "用镜头记录每一个值得珍藏的瞬间。", color: "linear-gradient(135deg,#25243e,#76659b,#d4a7a1)", tag: "编辑精选", icon: "🎞️" },
  { id: 7, title: "城市骑行", category: "旅行", year: "2025", score: "8.7", desc: "骑上自行车，重新认识熟悉的街道。", color: "linear-gradient(135deg,#173c45,#37858a,#c4bd83)", tag: "人气内容", icon: "🚲" },
  { id: 8, title: "星空计划", category: "科技", year: "2026", score: "9.3", desc: "仰望星空，了解宇宙中的奇妙现象。", color: "linear-gradient(135deg,#10152e,#303d73,#9b79bd)", tag: "最新上线", icon: "🌌" },
];

const categories = ["全部", "都市", "旅行", "科技", "纪录", "生活", "艺术"];

export default function WebDemo() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const [selected, setSelected] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("首页");
  const [page, setPage] = useState<"home" | "profile" | "category" | "discover">("home");
  const [discoverSort, setDiscoverSort] = useState<"hot" | "new">("hot");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return localStorage.getItem("hghub_demo_theme") === "light" ? "light" : "dark";
  });

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("hghub_demo_theme", next);
  }
  const [history, setHistory] = useState<{id:number; viewedAt:string}[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("hghub_demo_history") || "[]");
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("hghub_demo_favorites") || "[]"); }
    catch { return []; }
  });

  const filtered = useMemo(() => items.filter((item) => {
    const matchesCategory = category === "全部" || item.category === category;
    const matchesSearch = `${item.title}${item.desc}${item.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, search]);

  const current = items.find((item) => item.id === selected);

  function openDetail(id: number) {
    const nextHistory = [
      { id, viewedAt: new Date().toISOString() },
      ...history.filter(entry => entry.id !== id)
    ].slice(0, 20);

    setHistory(nextHistory);
    localStorage.setItem("hghub_demo_history", JSON.stringify(nextHistory));
    setSelected(id);
    window.history.pushState({ detail: id }, "", `?detail=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setSelected(null);
    window.history.pushState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFavorite(id: number) {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("hghub_demo_favorites", JSON.stringify(next));
  }

  return (
    <div className={`site theme-${theme}`}>
      <style>{`
        .site.theme-light{background:#f3f4f7;color:#20222b}
        .theme-light .topbar{background:#fff;border-color:#ddd}
        .theme-light .userbtn,.theme-light .secondary{background:#fff;color:#222;border-color:#ddd}
        .theme-light .card,.theme-light .detail-section>div{background:#fff;border-color:#ddd}
        .theme-light .detail-info p,.theme-light .card-desc{color:#666}
        .theme-light .section-head p{color:#777}        *{box-sizing:border-box}
        body{margin:0}
        button,input{font:inherit}
        button{cursor:pointer}
        html,body,#root{height:auto!important;min-height:100%;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:auto!important}
        .site{min-height:100vh;background:#0b0d12;color:#f4f4f7;font-family:Inter,"Microsoft YaHei",Arial,sans-serif}
        .topbar{height:76px;border-bottom:1px solid #242630;background:rgba(13,15,22,.96);display:flex;align-items:center;padding:0 max(calc((100vw - 1440px)/2),5%);gap:42px;position:sticky;top:0;z-index:5}
        .brand{font-size:25px;font-weight:850;letter-spacing:-1px;white-space:nowrap}
        .brand span{color:#ed4773}
        .nav{display:flex;gap:28px;align-items:center}
        .nav button{background:none;border:0;color:#a9aab4;font-size:14px;padding:27px 0;border-bottom:2px solid transparent}
        .nav button.active,.nav button:hover{color:white;border-color:#ed4773}
        .searchbox{margin-left:auto;display:flex;align-items:center;background:#20222c;border:1px solid #30323e;border-radius:10px;padding:0 13px;width:250px}
        .searchbox input{width:100%;background:transparent;border:0;outline:0;color:white;padding:11px 5px;font-size:13px}
        .searchbox span{color:#858896}
        .userbtn{border:1px solid #3a3c49;background:#242631;color:white;border-radius:9px;padding:10px 17px;font-size:13px;white-space:nowrap}
        .container{max-width:1440px;margin:auto;padding:32px 5% 70px}
        .hero{height:390px;border-radius:19px;overflow:hidden;position:relative;background:linear-gradient(90deg,rgba(8,9,16,.96),rgba(8,9,16,.62) 48%,rgba(8,9,16,.08)),linear-gradient(135deg,#211b3b,#7c345e,#d58a6c);display:flex;align-items:center;padding:55px 6%;box-shadow:0 18px 50px #0005}
        .hero:after{content:"";position:absolute;right:9%;top:12%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#f8c7a0,#b14c73 38%,#452b63 70%,transparent 72%);filter:drop-shadow(0 20px 55px #0008);opacity:.8}
        .hero-content{position:relative;z-index:1;max-width:520px}
        .eyebrow{color:#ff91ad;font-size:12px;letter-spacing:3px;font-weight:700}
        .hero h1{font-size:46px;line-height:1.15;margin:16px 0 13px;letter-spacing:-1.5px}
        .hero p{color:#d0cbd5;line-height:1.8;font-size:14px;max-width:440px}
        .hero-meta{display:flex;gap:17px;color:#c4bdca;font-size:12px;margin:18px 0 25px;flex-wrap:wrap}
        .primary{border:0;background:#ed4773;color:white;border-radius:9px;padding:12px 23px;font-weight:700}
        .primary:hover{background:#ff5b86}
        .section-head{display:flex;align-items:center;justify-content:space-between;margin:39px 0 19px}
        .section-head h2{font-size:21px;margin:0;font-weight:750}
        .section-head p{margin:6px 0 0;color:#858896;font-size:12px}
        .category-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
        .category-row button{background:#191b24;border:1px solid #2b2d38;color:#aeb0bb;border-radius:22px;padding:9px 17px;font-size:12px}
        .category-row button.active{background:#ed4773;border-color:#ed4773;color:white}
        .main-grid{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:27px;align-items:start}
        .cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
        .card{background:#171922;border:1px solid #262833;border-radius:13px;overflow:hidden;transition:transform .2s,border-color .2s;cursor:pointer}
        .card:hover{transform:translateY(-4px);border-color:#55515f}
        .poster{height:185px;display:flex;align-items:center;justify-content:center;font-size:62px;position:relative}
        .poster small{position:absolute;top:12px;left:12px;background:#111a;color:#fff;padding:6px 9px;border-radius:5px;font-size:10px;backdrop-filter:blur(8px)}
        .card-info{padding:14px}
        .card-title{font-size:15px;font-weight:700;margin-bottom:8px}
        .card-desc{font-size:11px;line-height:1.6;color:#9295a2;min-height:35px}
        .card-foot{display:flex;justify-content:space-between;color:#a5a7b1;font-size:11px;margin-top:13px}
        .score{color:#ffc36c;font-weight:700}
        .side{background:#171922;border:1px solid #282a35;border-radius:13px;padding:19px}
        .side h3{font-size:15px;margin:0 0 17px}
        .rank{display:flex;align-items:center;gap:11px;padding:12px 0;border-bottom:1px solid #292b35;cursor:pointer}
        .rank:last-child{border:0}
        .rank-no{font-size:18px;font-weight:800;color:#777b89;width:22px}
        .rank:nth-child(2) .rank-no,.rank:nth-child(3) .rank-no,.rank:nth-child(4) .rank-no{color:#f07891}
        .rank-name{font-size:12px;font-weight:650}
        .rank-cat{font-size:10px;color:#858896;margin-top:5px}
        .rank-score{margin-left:auto;color:#ffc36c;font-size:11px}
        .empty{padding:55px 10px;text-align:center;color:#999}
        .footer{border-top:1px solid #252731;color:#777b88;text-align:center;padding:25px;font-size:11px}
        .detail-wrap{max-width:1200px;margin:auto;padding:32px 5% 70px}
        .back{background:#20222c;border:1px solid #343744;color:#ddd;border-radius:8px;padding:10px 16px;margin-bottom:22px}
        .detail-hero{min-height:340px;border-radius:18px;overflow:hidden;display:flex;align-items:center;padding:48px 6%;position:relative}
        .detail-hero:after{content:"";position:absolute;right:10%;top:10%;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff8,#fff1 40%,#0000 72%);border:1px solid #ffffff33}
        .detail-info{position:relative;z-index:1;max-width:650px}
        .detail-info h1{font-size:42px;margin:15px 0}
        .detail-info p{color:#e1dce5;line-height:1.9;max-width:560px}
        .detail-meta{display:flex;gap:18px;flex-wrap:wrap;color:#e1dce5;font-size:13px;margin:20px 0}
        .detail-actions{display:flex;gap:12px;flex-wrap:wrap}
        .secondary{background:#242633;border:1px solid #ffffff44;color:white;border-radius:9px;padding:12px 19px}
        .detail-section{margin-top:36px}
        .detail-section h2{font-size:21px;margin-bottom:18px}
        .detail-related{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
        .favorite-mark{color:#ff7798}
        @media(max-width:1050px){.cards,.detail-related{grid-template-columns:repeat(3,minmax(0,1fr))}.main-grid{grid-template-columns:minmax(0,1fr) 230px}.hero:after{right:2%}}
        @media(max-width:760px){.topbar{height:auto;min-height:65px;padding:14px 5%;gap:15px;flex-wrap:wrap}.brand{font-size:21px}.nav{order:3;width:100%;justify-content:space-between;gap:10px}.nav button{padding:8px 0}.searchbox{width:min(48%,220px)}.userbtn{padding:9px 12px}.container{padding-top:20px}.hero{height:330px;padding:30px 7%}.hero h1{font-size:34px}.hero:after{right:-100px;opacity:.35}.main-grid{grid-template-columns:1fr}.side{display:none}.cards,.detail-related{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.poster{height:145px;font-size:48px}.section-head{margin-top:28px}.detail-hero{padding:30px 7%;min-height:300px}.detail-info h1{font-size:32px}.detail-hero:after{right:-100px;opacity:.4}}
        @media(max-width:420px){.searchbox{order:4;width:100%}.hero h1{font-size:29px}.cards,.detail-related{gap:9px}.card-info{padding:11px}.poster{height:125px}.card-title{font-size:13px}}
      `}</style>

      <header className="topbar">
        <div className="brand" onClick={goHome} style={{cursor:"pointer"}}>HG<span>hub</span></div>
        <nav className="nav">
          {["首页", "发现", "分类"].map((name) => (
            <button key={name} className={activeNav === name ? "active" : ""} onClick={() => {
              setActiveNav(name);
              setSelected(null);
              if (name === "分类") {
                setPage("category");
              } else if (name === "发现") {
                setPage("discover");
              } else {
                setPage("home");
                setCategory("全部");
              }
            }}>
              {name}
            </button>
          ))}
        </nav>
        <label className="searchbox">
          <span>⌕</span>
          <input value={search} onChange={(e) => { setSearch(e.target.value); if(selected !== null) goHome(); }} placeholder="搜索标题、分类..." />
        </label>
        <button className="userbtn" onClick={() => { setPage("profile"); setSelected(null); }}>个人中心</button>
      </header>

      {page === "profile" ? (
        <main className="detail-wrap">
          <button className="back" onClick={goHome}>← 返回首页</button>

          <section style={{background:"#191b25",border:"1px solid #30323e",borderRadius:16,padding:30,marginBottom:28}}>
            <div style={{fontSize:12,color:"#ed4773",letterSpacing:2}}>HG HUB · PERSONAL CENTER</div>
            <h1 style={{fontSize:32,margin:"15px 0 8px"}}>个人中心</h1>
            <p style={{color:"#9295a2"}}>访客用户 · 本地浏览模式</p>
            <div style={{display:"flex",gap:30,marginTop:24}}>
              <div><strong style={{fontSize:25}}>{favorites.length}</strong><div style={{fontSize:12,color:"#9295a2"}}>我的收藏</div></div>
              <div><strong style={{fontSize:25}}>本地</strong><div style={{fontSize:12,color:"#9295a2"}}>数据存储</div></div>
            </div>
          </section>

          <div className="section-head">
            <div><h2>我的收藏</h2><p>你保存的精彩内容</p></div>
            {favorites.length > 0 && (
              <button className="secondary" onClick={() => {
                if (window.confirm("确定清空全部收藏吗？")) {
                  setFavorites([]);
                  localStorage.setItem("hghub_demo_favorites", "[]");
                }
              }}>清空收藏</button>
            )}
          </div>

          <section className="cards">
            {items.filter(item => favorites.includes(item.id)).map(item => (
              <article className="card" key={item.id} onClick={() => openDetail(item.id)}>
                <div className="poster" style={{background:item.color}}>{item.icon}</div>
                <div className="card-info">
                  <div className="card-title">{item.title}</div>
                  <div className="card-desc">{item.desc}</div>
                  <div className="card-foot">
                    <span>{item.category}</span>
                    <span className="score">★ {item.score}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {favorites.length === 0 && (
            <div className="empty">还没有收藏内容，返回首页添加一些收藏吧。</div>
          )}

          <section className="detail-section">
            <div className="section-head">
              <div><h2>最近浏览</h2><p>最近查看过的内容</p></div>
              {history.length > 0 && (
                <button className="secondary" onClick={() => {
                  if (window.confirm("确定清空浏览记录吗？")) {
                    setHistory([]);
                    localStorage.setItem("hghub_demo_history", "[]");
                  }
                }}>清空记录</button>
              )}
            </div>

            <div className="cards">
              {history.map(entry => {
                const item = items.find(x => x.id === entry.id);
                if (!item) return null;
                return (
                  <article className="card" key={entry.id} onClick={() => openDetail(item.id)}>
                    <div className="poster" style={{background:item.color}}>{item.icon}</div>
                    <div className="card-info">
                      <div className="card-title">{item.title}</div>
                      <div className="card-desc">{item.desc}</div>
                      <div className="card-foot">
                        <span>{item.category}</span>
                        <span>{new Date(entry.viewedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {history.length === 0 && <div className="empty">暂时没有浏览记录。</div>}
          </section>
          <section className="detail-section" style={{marginTop:45}}>
            <h2>个人设置</h2>
            <div style={{background:"#191b25",padding:20,borderRadius:12,color:"#aeb0bb",fontSize:13,lineHeight:2}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:15,marginBottom:18}}>
                <span>网站主题：{theme === "dark" ? "深色模式" : "浅色模式"}</span>
                <button className="secondary" onClick={toggleTheme}>
                  切换为{theme === "dark" ? "浅色" : "深色"}模式
                </button>
              </div>
              当前版本：HGhub Web Demo<br/>
              数据模式：浏览器本地存储<br/>
              账户功能：尚未启用
            </div>
          </section>
        </main>
      ) : page === "discover" ? (
        <main className="detail-wrap">
          <button className="back" onClick={() => {
            setPage("home");
            setActiveNav("首页");
          }}>← 返回首页</button>

          <section className="detail-section">
            <div className="section-head">
              <div>
                <h2>发现精彩内容</h2>
                <p>探索最新内容与热门推荐</p>
              </div>
              <span style={{color:"#9295a2",fontSize:12}}>{items.length} 个内容</span>
            </div>

            <div className="category-row">
              <button className={discoverSort === "hot" ? "active" : ""} onClick={() => setDiscoverSort("hot")}>🔥 热门</button>
              <button className={discoverSort === "new" ? "active" : ""} onClick={() => setDiscoverSort("new")}>最新收录</button>
              <button onClick={() => setCategory("旅行")}>旅行</button>
              <button onClick={() => setCategory("科技")}>科技</button>
              <button onClick={() => setCategory("全部")}>全部分类</button>
            </div>

            <div className="section-head">
              <h2>最新推荐</h2>
              <button className="secondary" onClick={() => setCategory("全部")}>查看全部</button>
            </div>

            <section className="cards">
              {items
                .filter(item => category === "全部" || item.category === category)
                .slice()
                .sort((a,b) => discoverSort === "hot" ? Number(b.score)-Number(a.score) : Number(b.year)-Number(a.year))
                .map(item => (
                  <article className="card" key={item.id} onClick={() => openDetail(item.id)}>
                    <div className="poster" style={{background:item.color}}>
                      <small>{item.tag}</small>{item.icon}
                    </div>
                    <div className="card-info">
                      <div className="card-title">{item.title}</div>
                      <div className="card-desc">{item.desc}</div>
                      <div className="card-foot">
                        <span>{item.category} · {item.year}</span>
                        <span className="score">★ {item.score}</span>
                      </div>
                    </div>
                  </article>
                ))}
            </section>

            <div className="section-head">
              <div><h2>高分内容</h2><p>按推荐评分排序</p></div>
            </div>

            <section className="cards">
              {items.slice().sort((a,b) => Number(b.score)-Number(a.score)).slice(0,4).map(item => (
                <article className="card" key={item.id} onClick={() => openDetail(item.id)}>
                  <div className="poster" style={{background:item.color}}>{item.icon}</div>
                  <div className="card-info">
                    <div className="card-title">{item.title}</div>
                    <div className="card-foot">
                      <span>{item.category}</span>
                      <span className="score">★ {item.score}</span>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </main>      ) : page === "category" ? (
        <main className="detail-wrap">
          <button className="back" onClick={() => {
            setPage("home");
            setActiveNav("首页");
            setCategory("全部");
          }}>← 返回首页</button>

          <section className="detail-section">
            <div className="section-head">
              <div>
                <h2>内容分类</h2>
                <p>选择你感兴趣的主题，浏览对应内容</p>
              </div>
              <span style={{color:"#9295a2",fontSize:13}}>
                {category === "全部" ? items.length : items.filter(x => x.category === category).length} 个内容
              </span>
            </div>

            <div className="category-row">
              {categories.map((name) => {
                const count = name === "全部"
                  ? items.length
                  : items.filter(x => x.category === name).length;
                return (
                  <button
                    key={name}
                    className={category === name ? "active" : ""}
                    onClick={() => setCategory(name)}
                  >
                    {name} <span style={{opacity:.7}}>({count})</span>
                  </button>
                );
              })}
            </div>

            <section className="cards">
              {items.filter(item =>
                (category === "全部" || item.category === category) &&
                `${item.title}${item.desc}`.toLowerCase().includes(search.toLowerCase())
              ).map(item => (
                <article className="card" key={item.id} onClick={() => openDetail(item.id)}>
                  <div className="poster" style={{background:item.color}}>
                    <small>{item.tag}</small>{item.icon}
                  </div>
                  <div className="card-info">
                    <div className="card-title">{item.title}</div>
                    <div className="card-desc">{item.desc}</div>
                    <div className="card-foot">
                      <span>{item.category} · {item.year}</span>
                      <span className="score">★ {item.score}</span>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </main>
      ) : current ? (
        <main className="detail-wrap">
          <button className="back" onClick={goHome}>← 返回首页</button>
          <section className="detail-hero" style={{background:current.color}}>
            <div className="detail-info">
              <div className="eyebrow">HG HUB · CONTENT DETAIL</div>
              <h1>{current.title}</h1>
              <div className="detail-meta">
                <span>★ {current.score} 推荐评分</span>
                <span>{current.year}</span>
                <span>{current.category}</span>
                <span>{current.tag}</span>
              </div>
              <p>{current.desc} 这里展示的是原创模拟内容介绍。你可以在此扩展自己的合法内容资料、图片和文字信息。</p>
              <div className="detail-actions">
                <button className="primary" onClick={() => alert("当前为静态演示页面，尚未接入播放功能。")}>了解内容</button>
                <button className="secondary" onClick={() => toggleFavorite(current.id)}>
                  {favorites.includes(current.id) ? "♥ 已收藏" : "♡ 收藏"}
                </button>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <h2>内容介绍</h2>
            <p style={{color:"#aeb0bb",lineHeight:2,maxWidth:850}}>{current.desc} 本页面为网页演示详情页。正式使用时，可以在这里添加经授权的作品介绍、制作信息、图片和其他资料。</p>
          </section>

          <section className="detail-section">
            <h2>相关推荐</h2>
            <div className="detail-related">
              {items.filter((item) => item.id !== current.id).slice(0,4).map((item) => (
                <article className="card" key={item.id} onClick={() => openDetail(item.id)}>
                  <div className="poster" style={{background:item.color}}>{item.icon}</div>
                  <div className="card-info">
                    <div className="card-title">{item.title}</div>
                    <div className="card-desc">{item.desc}</div>
                    <div className="card-foot"><span>{item.category}</span><span className="score">★ {item.score}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main className="container">
          <section className="hero">
            <div className="hero-content">
              <div className="eyebrow">HG HUB · FEATURED</div>
              <h1>发现值得<br />停留的精彩</h1>
              <p>探索精选故事、旅行灵感、科技发现与日常生活。每一次浏览，都有新的发现。</p>
              <div className="hero-meta"><span>✦ 编辑精选</span><span>2026 年度推荐</span><span>原创演示内容</span></div>
              <button className="primary" onClick={() => openDetail(1)}>查看推荐内容　→</button>
            </div>
          </section>

          <div className="section-head">
            <div><h2>为你推荐</h2><p>精选内容 · 持续发现新灵感</p></div>
            <span style={{color:"#858896",fontSize:12}}>{filtered.length} 个内容</span>
          </div>

          <div className="category-row">
            {categories.map((name) => (
              <button key={name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>{name}</button>
            ))}
          </div>

          <div className="main-grid">
            <section className="cards">
              {filtered.map((item) => (
                <article className="card" key={item.id} onClick={() => openDetail(item.id)}>
                  <div className="poster" style={{background:item.color}}>
                    <small>{item.tag}</small>{item.icon}
                  </div>
                  <div className="card-info">
                    <div className="card-title">{item.title}</div>
                    <div className="card-desc">{item.desc}</div>
                    <div className="card-foot"><span>{item.category} · {item.year}</span><span className="score">★ {item.score}</span></div>
                  </div>
                </article>
              ))}
              {filtered.length === 0 && <div className="empty">没有找到相关内容，试试其他关键词或分类。</div>}
            </section>

            <aside className="side">
              <h3>本周热门</h3>
              {items.slice().sort((a,b) => Number(b.score)-Number(a.score)).slice(0,5).map((item,index) => (
                <div className="rank" key={item.id} onClick={() => openDetail(item.id)}>
                  <div className="rank-no">{index+1}</div>
                  <div><div className="rank-name">{item.title}</div><div className="rank-cat">{item.category} · {item.year}</div></div>
                  <div className="rank-score">{item.score}</div>
                </div>
              ))}
            </aside>
          </div>
        </main>
      )}

      <footer className="footer">HGhub Web Demo · 使用模拟数据展示 · 非正式内容服务</footer>
    </div>
  );
}
















