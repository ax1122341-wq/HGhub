import { useMemo, useState, useEffect } from "react";

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
  const [page, setPage] = useState<"home" | "profile" | "category" | "discover" | "ranking">("home");
  const [discoverSort, setDiscoverSort] = useState<"hot" | "new">("hot");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);
  useEffect(() => {
    if (page !== "home" || selected !== null || !heroPlaying) return;

    const timer = window.setInterval(() => {
      setHeroIndex(current => (current + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [page, selected, heroPlaying]);
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

  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("hghub_demo_nickname") || "访客用户";
  });  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem("hghub_demo_avatar") || "";
  });
  const [bio, setBio] = useState(() => {
    return localStorage.getItem("hghub_demo_bio") || "";
  });
  const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordMessage, setPasswordMessage] = useState("");
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
.theme-light .detail-wrap > section:first-of-type {
  background:#ffffff !important;
  border-color:#dddddd !important;
}
.theme-light .detail-wrap > section:first-of-type h1,
.theme-light .detail-wrap > section:first-of-type strong {
  color:#222222 !important;
}
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
        .detail-hero{min-height:360px;border-radius:18px;overflow:hidden;display:flex;align-items:center;padding:48px 5%;position:relative}
        .detail-hero:after{content:"";position:absolute;right:10%;top:10%;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff8,#fff1 40%,#0000 72%);border:1px solid #ffffff33}
        .detail-info{position:relative;z-index:1;max-width:56%}
        .detail-info h1{font-size:42px;margin:15px 0}
        .detail-info p{color:#e1dce5;line-height:1.9;max-width:560px}
        .detail-meta{display:flex;gap:18px;flex-wrap:wrap;color:#e1dce5;font-size:13px;margin:20px 0}
        .detail-actions{display:flex;gap:12px;flex-wrap:wrap}
        .secondary{background:#242633;border:1px solid #ffffff44;color:white;border-radius:9px;padding:12px 19px}
        .detail-section{margin-top:36px}
        .detail-section h2{font-size:21px;margin-bottom:18px}
        .detail-related{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
        .favorite-mark{color:#ff7798}

        .profile-hero{position:relative;overflow:hidden;border:1px solid #30323e;border-radius:20px;padding:30px;margin-bottom:30px;background:linear-gradient(135deg,#191b25 0%,#26233a 58%,#48243a 100%);box-shadow:0 14px 40px #0002}
        .profile-kicker{font-size:11px;letter-spacing:2px;color:#ff83a2;font-weight:700}
        .profile-heading{font-size:30px;margin:10px 0 24px;color:#fff}
        .profile-identity{display:flex;align-items:center;gap:22px;flex-wrap:wrap}
        .profile-avatar{width:88px;height:88px;border-radius:50%;object-fit:cover;border:3px solid #ed4773;box-shadow:0 5px 18px #0003}
        .profile-avatar-fallback{width:88px;height:88px;border-radius:50%;display:grid;place-items:center;background:#30323e;font-size:34px;border:3px solid #ed4773}
        .profile-actions{display:flex;gap:9px;align-items:center;flex-wrap:wrap}
        .profile-fields{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:14px;margin-top:22px}
        .profile-field{display:grid;gap:7px;min-width:0}
        .profile-field span,.password-field span{font-size:12px;color:#aeb0bb;font-weight:650}
        .profile-control{width:100%;padding:12px 13px;border:1px solid #424552;border-radius:10px;background:#11131b;color:#f4f4f7;outline:none}
        .profile-control:focus{border-color:#ed4773;box-shadow:0 0 0 3px #ed477322}
        .profile-bio{resize:vertical;min-height:82px}
        .profile-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:20px}
        .profile-stat{padding:14px 16px;border:1px solid #ffffff20;background:#ffffff0a;border-radius:12px}
        .profile-stat strong{display:block;font-size:23px;color:#fff}
        .profile-stat span{font-size:11px;color:#b9bac5}
        .profile-panel{padding:22px;border-radius:16px;border:1px solid #30323e;background:#191b25}
        .profile-panel-title{font-size:18px;margin:0 0 6px}
        .profile-panel-subtitle{font-size:12px;color:#9295a2;margin:0 0 18px}
        .profile-settings-row{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;padding-bottom:18px;border-bottom:1px solid #ffffff20}
        .password-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
        .password-field{display:grid;gap:7px;min-width:0}
        .password-field .profile-control{min-width:0}
        .profile-message{font-size:12px;margin:12px 0 0}
        .profile-meta{font-size:12px;color:#9295a2;line-height:1.9;margin-top:18px}
        .theme-light .profile-hero{background:linear-gradient(135deg,#fff 0%,#f7f0f5 58%,#fce8ef 100%);border-color:#e5dce2}
        .theme-light .profile-heading,.theme-light .profile-stat strong{color:#20222b}
        .theme-light .profile-stat{background:#ffffffb8;border-color:#e6dce2}
        .theme-light .profile-stat span,.theme-light .profile-field span,.theme-light .password-field span{color:#666}
        .theme-light .profile-control{background:#fff;color:#20222b;border-color:#d7d7df}
        .theme-light .profile-panel{background:#fff;border-color:#ddd;color:#333}
        .theme-light .profile-panel-subtitle,.theme-light .profile-meta{color:#777}
        @media(max-width:760px){.profile-hero{padding:22px}.profile-fields{grid-template-columns:1fr}.profile-stats{grid-template-columns:repeat(3,minmax(0,1fr))}.password-grid{grid-template-columns:1fr}}

        @media(max-width:1050px){.cards,.detail-related{grid-template-columns:repeat(3,minmax(0,1fr))}.main-grid{grid-template-columns:minmax(0,1fr) 230px}.hero:after{right:2%}}
        @media(max-width:760px){.topbar{height:auto;min-height:65px;padding:14px 5%;gap:15px;flex-wrap:wrap}.brand{font-size:21px}.nav{order:3;width:100%;justify-content:space-between;gap:10px}.nav button{padding:8px 0}.searchbox{width:min(48%,220px)}.userbtn{padding:9px 12px}.container{padding-top:20px}.hero{height:330px;padding:30px 7%}.hero h1{font-size:34px}.hero:after{right:-100px;opacity:.35}.main-grid{grid-template-columns:1fr}.side{display:none}.cards,.detail-related{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.poster{height:145px;font-size:48px}.section-head{margin-top:28px}.detail-hero{padding:30px 7%;min-height:300px}.detail-info h1{font-size:32px}.detail-hero:after{right:-100px;opacity:.4}}
        @media(max-width:420px){.searchbox{order:4;width:100%}.hero h1{font-size:29px}.cards,.detail-related{gap:9px}.card-info{padding:11px}.poster{height:125px}.card-title{font-size:13px}}

        /* 3.1 visual polish */
        .hero{isolation:isolate}
        .hero:before{content:"";position:absolute;inset:0;z-index:0;background:linear-gradient(90deg,rgba(7,13,27,.88) 0%,rgba(7,13,27,.58) 48%,rgba(7,13,27,.08) 100%);pointer-events:none}
        .hero:after{z-index:0;pointer-events:none}
        .hero-content{color:#fff}
        .hero h1{color:#fff;text-shadow:0 3px 18px rgba(0,0,0,.28)}
        .hero p{color:rgba(255,255,255,.9);text-shadow:0 1px 8px rgba(0,0,0,.18)}
        .hero-meta{color:rgba(255,255,255,.88)}
        .hero .secondary{background:rgba(255,255,255,.94);color:#20222b;border-color:rgba(255,255,255,.7);backdrop-filter:blur(8px)}
        .hero .secondary:hover{background:#fff;transform:translateY(-1px)}
        .card{box-shadow:0 5px 18px rgba(0,0,0,.06)}
        .card:hover{box-shadow:0 12px 28px rgba(0,0,0,.14)}
        .poster{overflow:hidden;isolation:isolate}
        .poster:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.18));z-index:-1;pointer-events:none}
        .poster small{z-index:1}
        .card-title{line-height:1.45}
        .card-desc{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .category-row button{transition:background .18s,border-color .18s,color .18s,transform .18s}
        .category-row button:hover{border-color:#ed4773;color:#fff;transform:translateY(-1px)}
        .theme-light .category-row button:hover{color:#ed4773}
        .searchbox:focus-within{border-color:#ed4773;box-shadow:0 0 0 3px rgba(237,71,115,.13)}
        button:focus-visible,.card:focus-visible{outline:3px solid rgba(237,71,115,.55);outline-offset:3px}
        .theme-light .hero{box-shadow:0 18px 42px rgba(26,35,55,.16)}
        .theme-light .card{box-shadow:0 5px 18px rgba(26,35,55,.05)}
        .theme-light .card:hover{box-shadow:0 12px 28px rgba(26,35,55,.13)}
        @media(max-width:760px){.hero:before{background:linear-gradient(90deg,rgba(7,13,27,.84),rgba(7,13,27,.46))}.hero-content{max-width:100%}.hero h1{max-width:90%}}


        /* HGhub 3.2: stronger contrast, cleaner cards, responsive hero */
        .site .hero{min-height:390px;overflow:hidden;isolation:isolate;background-size:cover;background-position:center}
        .site .hero:before{z-index:0;background:linear-gradient(90deg,rgba(5,12,27,.94) 0%,rgba(5,12,27,.78) 42%,rgba(5,12,27,.28) 76%,rgba(5,12,27,.12) 100%)}
        .site .hero:after{z-index:0;right:8%;top:10%;width:clamp(210px,23vw,320px);height:clamp(210px,23vw,320px);opacity:.72}
        .site .hero .hero-content{z-index:2;max-width:560px;color:#fff}
        .site .hero .hero-content .eyebrow{color:#ffb0c2;text-shadow:0 2px 10px rgba(0,0,0,.35)}
        .site .hero .hero-content h1{color:#fff!important;font-weight:850;text-shadow:0 3px 20px rgba(0,0,0,.55);letter-spacing:-1.8px}
        .site .hero .hero-content p{color:#fff!important;font-weight:500;text-shadow:0 2px 12px rgba(0,0,0,.55)}
        .site .hero .hero-meta{color:rgba(255,255,255,.96);font-weight:600;text-shadow:0 1px 8px rgba(0,0,0,.4)}
        .site .hero .primary{box-shadow:0 8px 20px rgba(10,10,20,.22);transition:transform .18s,box-shadow .18s,background .18s}
        .site .hero .primary:hover{transform:translateY(-2px);box-shadow:0 12px 25px rgba(10,10,20,.3)}
.site .hero{border:1px solid rgba(255,255,255,.16);box-shadow:0 22px 55px rgba(10,15,30,.2)}
.site .hero:before{background:linear-gradient(90deg,rgba(3,8,22,.97) 0%,rgba(7,15,35,.82) 43%,rgba(10,20,42,.32) 100%)}
.site .hero:after{opacity:.85;filter:drop-shadow(0 18px 35px rgba(0,0,0,.25))}
.site .hero .hero-content h1{font-size:clamp(38px,5vw,58px);line-height:1.12;margin:20px 0;letter-spacing:-2px}
.site .hero .hero-content .eyebrow{letter-spacing:4px;font-weight:800}
.site .hero .hero-content p{font-size:17px;line-height:1.9}
.site .hero .primary{border-radius:12px;padding:15px 26px;font-size:17px;font-weight:800;background:linear-gradient(135deg,#ff477c,#e93668)}
.site .hero .secondary{border-radius:12px}
        .site .hero .secondary{font-weight:600;box-shadow:0 5px 14px rgba(10,10,20,.12);transition:transform .18s,background .18s,box-shadow .18s}
        .site .hero .secondary:hover{transform:translateY(-2px);box-shadow:0 9px 18px rgba(10,10,20,.2)}
        .site .section-head h2{letter-spacing:-.35px}
        .site .card{position:relative;box-shadow:0 7px 22px rgba(0,0,0,.09);transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}
        .site .card:hover{transform:translateY(-10px) scale(1.015);box-shadow:0 24px 48px rgba(20,20,35,.2);border-color:rgba(237,71,115,.8)}
.site .card .poster{transition:filter .25s ease,background-size .3s ease}
.site .card:hover .poster{filter:saturate(1.2) brightness(1.04)}
.site .card .card-title{transition:color .2s ease}
.site .card:hover .card-title{color:#ed4773}
        .site .poster{min-height:145px;background-position:center;background-size:cover}
        .site .poster:after{z-index:0;background:linear-gradient(180deg,rgba(0,0,0,.02) 25%,rgba(0,0,0,.22) 100%)}
        .site .poster>*{position:relative;z-index:1}
        .site .card-title{font-size:15px;font-weight:800;letter-spacing:.1px}
        .site .card-desc{color:#aeb1bd;line-height:1.7}
        .site .category-row button{font-weight:650;min-height:38px}
        .site .category-row button.active{box-shadow:0 5px 15px rgba(237,71,115,.22)}
        .site .searchbox{transition:border-color .18s,box-shadow .18s,background .18s}
        .site .searchbox:focus-within{background:#242632}
        .theme-light .card-desc{color:#666}
        .theme-light .hero .hero-content h1,.theme-light .hero .hero-content p{color:#fff!important}
        @media(max-width:760px){
          .site .hero{min-height:340px;height:auto;padding:30px 7%;}
          .site .hero:before{background:linear-gradient(90deg,rgba(5,12,27,.92),rgba(5,12,27,.72) 70%,rgba(5,12,27,.4))}
          .site .hero:after{width:190px;height:190px;right:-55px;top:14%;opacity:.28}
          .site .hero .hero-content{max-width:100%;}
          .site .hero .hero-content h1{font-size:clamp(30px,8vw,38px);max-width:100%;}
          .site .hero .hero-content p{max-width:95%;}
          .site .hero .hero-meta{gap:12px;margin:14px 0 20px}
          .site .hero .hero-content>div:last-child{display:flex;flex-wrap:wrap;gap:8px!important;align-items:center}
          .site .hero .secondary{padding:10px 13px}
          .site .poster{min-height:125px}
        }
        @media(max-width:420px){
          .site .hero{min-height:320px;padding:25px 6%}
          .site .hero .hero-content h1{font-size:29px}
          .site .hero .hero-content .primary{padding:11px 17px}
          .site .hero .secondary{font-size:12px;padding:9px 10px}
          .site .card{border-radius:11px}
        }


        /* HGhub 3.3: content cards and detail-page hierarchy */
        .site .cards{align-items:stretch;gap:20px}
        .site .card{display:flex;flex-direction:column;min-width:0;border-radius:20px;overflow:hidden;border:1px solid rgba(130,130,150,.16);box-shadow:0 10px 28px rgba(20,20,35,.10)}
        .site .poster{height:auto;aspect-ratio:16/10;min-height:0;display:flex;align-items:center;justify-content:center;font-size:clamp(48px,5vw,68px);position:relative;isolation:isolate;transition:filter .22s ease}
        .site .poster:before{content:"";position:absolute;inset:10% 12%;border:1px solid rgba(255,255,255,.2);border-radius:48% 52% 42% 58%;transform:rotate(-13deg);z-index:-1;opacity:.8}
        .site .poster:after{z-index:0;background:linear-gradient(180deg,rgba(5,8,20,.02) 15%,rgba(5,8,20,.38) 100%)}
        .site .card:hover .poster{filter:saturate(1.12) brightness(1.04)}
        .site .poster small{top:13px;left:13px;padding:7px 10px;border:1px solid rgba(255,255,255,.18);background:rgba(12,15,27,.58);font-weight:700;letter-spacing:.2px;backdrop-filter:blur(10px)}
        .site .card-info{display:flex;flex:1;flex-direction:column;padding:16px}
        .site .card-title{font-size:16px;margin-bottom:7px;line-height:1.4}
        .site .card-desc{font-size:12px;min-height:40px;line-height:1.7}
        .site .card-foot{align-items:center;gap:8px;margin-top:auto;padding-top:14px;font-size:11px}
        .site .score{white-space:nowrap;background:rgba(255,195,108,.1);padding:5px 8px;border-radius:20px}
        .site .detail-hero{box-shadow:0 18px 42px rgba(0,0,0,.13)}
        .site .detail-info .eyebrow{color:#ffd0da;text-shadow:0 2px 10px rgba(0,0,0,.35)}
        .site .detail-info h1{color:#fff;font-weight:850;letter-spacing:-1px;text-shadow:0 3px 18px rgba(0,0,0,.3)}
        .site .detail-info p{color:rgba(255,255,255,.92)}
        .site .detail-section{margin-top:34px}
        .site .detail-section h2{font-size:22px;font-weight:800;letter-spacing:-.4px}
        .site .detail-related .card{min-width:0}
        .theme-light .site .card{background:#fff;border-color:#e7e3e8}
        .theme-light .site .card-desc{color:#666b78}
.site.theme-light .detail-info h1{color:#222!important;text-shadow:none!important}
.site.theme-light .detail-info p{color:#555!important}
.site.theme-light .detail-meta{color:#666!important}
.site.theme-light .detail-section p{color:#555!important}
.site.theme-light .detail-section h2{color:#222!important}
        .theme-light .site .card-foot{color:#737887}
        @media(max-width:760px){
          .site .cards{gap:13px}
          .site .card-info{padding:12px}
          .site .card-title{font-size:14px}
          .site .card-desc{font-size:11px;min-height:36px}
          .site .poster small{top:9px;left:9px;padding:5px 7px;font-size:9px}
          .site .detail-hero{padding:30px 7%}
          .site .detail-info h1{font-size:clamp(28px,8vw,36px)}
        }
        @media(max-width:420px){
          .site .cards,.site .detail-related{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
          .site .card-info{padding:10px}
          .site .card-title{font-size:13px}
          .site .card-foot{font-size:10px;flex-wrap:wrap}
          .site .poster{font-size:46px}
        }

      `}</style>

      <header className="topbar">
        <div className="brand" onClick={goHome} style={{cursor:"pointer"}}>HG<span>hub</span></div>
        <nav className="nav">
          {["首页", "发现", "分类", "排行榜"].map((name) => (
            <button key={name} className={activeNav === name ? "active" : ""} onClick={() => {
              setActiveNav(name);
              setSelected(null);
              if (name === "分类") {
                setPage("category");
              } else if (name === "发现") {
                setPage("discover");
                setCategory("全部");
              } else if (name === "排行榜") {
                setPage("ranking");
                setCategory("全部");
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

          <section className="profile-hero">
            <div className="profile-kicker">HG HUB · PERSONAL CENTER</div>
            <h1 className="profile-heading">个人中心</h1>

            <div className="profile-identity">
              {avatar ? (
                <img src={avatar} alt="个人头像" className="profile-avatar" />
              ) : (
                <div className="profile-avatar-fallback">👤</div>
              )}
              <div className="profile-actions">
                <label className="secondary" style={{padding:"10px 15px",cursor:"pointer"}}>
                  上传头像
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 1024 * 1024) {
                      window.alert("图片不能超过1MB，请选择较小的图片。");
                      e.target.value = "";
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () => {
                      const result = String(reader.result || "");
                      try {
                        localStorage.setItem("hghub_demo_avatar", result);
                        setAvatar(result);
                      } catch {
                        window.alert("头像保存失败，请更换较小的图片。");
                      }
                    };
                    reader.readAsDataURL(file);
                    e.target.value = "";
                  }} />
                </label>
                {avatar && (
                  <button className="secondary" onClick={() => {
                    setAvatar("");
                    localStorage.removeItem("hghub_demo_avatar");
                  }}>恢复默认头像</button>
                )}
              </div>
            </div>

            <div className="profile-fields">
              <label className="profile-field">
                <span>昵称</span>
                <input className="profile-control" value={nickname} maxLength={20} placeholder="输入你的昵称" onChange={(e) => {
                  setNickname(e.target.value);
                  localStorage.setItem("hghub_demo_nickname", e.target.value);
                }} />
              </label>
              <label className="profile-field">
                <span>个人简介 · 最多120字</span>
                <textarea className="profile-control profile-bio" value={bio} maxLength={120} rows={3} placeholder="介绍一下自己吧..." onChange={(e) => {
                  setBio(e.target.value);
                  localStorage.setItem("hghub_demo_bio", e.target.value);
                }} />
                <span style={{textAlign:"right"}}>{bio.length}/120</span>
              </label>
            </div>

            <div className="profile-stats">
              <div className="profile-stat"><strong>{favorites.length}</strong><span>我的收藏</span></div>
              <div className="profile-stat"><strong>{history.length}</strong><span>浏览记录</span></div>
              <div className="profile-stat"><strong>本地</strong><span>数据存储模式</span></div>
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

          <section className="detail-section" style={{marginTop:38}}>
            <div className="profile-panel">
              <h2 className="profile-panel-title">个人设置</h2>
              <p className="profile-panel-subtitle">管理页面外观与演示账户选项</p>

              <div className="profile-settings-row">
                <span>网站主题：{theme === "dark" ? "深色模式" : "浅色模式"}</span>
                <button className="secondary" onClick={toggleTheme}>
                  切换为{theme === "dark" ? "浅色" : "深色"}模式
                </button>
              </div>

              <div style={{marginTop:22}}>
                <h3 style={{fontSize:16,margin:"0 0 6px"}}>修改密码（演示）</h3>
                <p className="profile-panel-subtitle">仅用于演示表单验证，不会保存或修改真实账户密码。</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!currentPassword || !newPassword || !confirmPassword) {
                    setPasswordMessage("请填写所有输入框。");
                    return;
                  }
                  if (newPassword.length < 8) {
                    setPasswordMessage("新密码至少需要8个字符。");
                    return;
                  }
                  if (newPassword !== confirmPassword) {
                    setPasswordMessage("两次输入的新密码不一致。");
                    return;
                  }
                  setPasswordMessage("演示验证通过，但账户功能尚未启用，真实密码没有修改。");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}>
                  <div className="password-grid">
                    <label className="password-field">
                      <span>当前密码</span>
                      <input className="profile-control" type="password" autoComplete="off" placeholder="请输入当前密码" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </label>
                    <label className="password-field">
                      <span>新密码</span>
                      <input className="profile-control" type="password" autoComplete="off" placeholder="至少8个字符" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </label>
                    <label className="password-field">
                      <span>确认新密码</span>
                      <input className="profile-control" type="password" autoComplete="off" placeholder="请再次输入新密码" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                  </div>
                  <button type="submit" className="secondary" style={{marginTop:14,padding:"11px 18px"}}>演示修改密码</button>
                  {passwordMessage && <p className="profile-message" style={{color:passwordMessage.includes("演示验证通过") ? "#16a34a" : "#ed4773"}}>{passwordMessage}</p>}
                </form>
              </div>

              <div className="profile-meta">
                当前版本：HGhub Web Demo<br/>
                数据模式：浏览器本地存储<br/>
                账户功能：尚未启用
              </div>
            </div>
          </section>
        </main>
      ) : page === "ranking" ? (
        <main className="detail-wrap">
          <button className="back" onClick={() => {
            setPage("home");
            setActiveNav("首页");
          }}>← 返回首页</button>

          <section className="detail-section">
            <div className="section-head">
              <div>
                <h2>排行榜</h2>
                <p>按照演示评分从高到低排列</p>
              </div>
              <span>TOP 8</span>
            </div>

                        <div className="ranking-list">
              {items.slice()
                .sort((a,b) => Number(b.score)-Number(a.score))
                .map((item,index) => (
                  <div
                    className="rank"
                    key={item.id}
                    onClick={() => openDetail(item.id)}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:16,
                      padding:16,
                      marginBottom:10,
                      borderRadius:14,
                      background:theme === "dark" ? "#20222b" : "#ffffff",
                      border:"1px solid rgba(128,128,128,.2)",
                      cursor:"pointer"
                    }}
                  >
                    <div className="rank-no" style={{fontSize:22,minWidth:30}}>
                      {index+1}
                    </div>
                    <div style={{
                      width:64,
                      height:64,
                      flexShrink:0,
                      borderRadius:12,
                      background:item.color,
                      display:"grid",
                      placeItems:"center",
                      fontSize:32
                    }}>
                      {item.icon}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div className="rank-name">{item.title}</div>
                      <div className="rank-cat">{item.category} · {item.year}</div>
                      <div className="card-desc">{item.desc}</div>
                    </div>
                    <div className="rank-score" style={{whiteSpace:"nowrap"}}>
                      ★ {item.score}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </main>      ) : page === "discover" ? (
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
          <div data-detail-art="true" aria-hidden="true" style={{position:"absolute",right:"9%",top:"50%",transform:"translateY(-50%)",width:280,height:280,borderRadius:44,display:"grid",placeItems:"center",fontSize:150,background:"linear-gradient(145deg,rgba(255,255,255,.28),rgba(255,255,255,.06))",border:"1px solid rgba(255,255,255,.35)",boxShadow:"0 25px 60px rgba(0,0,0,.2)",zIndex:0}}>{current.icon}</div>
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
          <section className="hero" style={{background:items[heroIndex % items.length].color}}>
  <div className="hero-content">
    <div className="eyebrow">HG HUB · FEATURED</div>
    <h1>{items[heroIndex % items.length].title}</h1>
    <p>{items[heroIndex % items.length].desc}</p>
    <div className="hero-meta">
      <span>★ {items[heroIndex % items.length].score}</span>
      <span>{items[heroIndex % items.length].year}</span>
      <span>{items[heroIndex % items.length].category}</span>
    </div>
    <button className="primary" onClick={() => openDetail(items[heroIndex % items.length].id)}>
      查看详情 →
    </button>
    <div style={{display:"flex",alignItems:"center",gap:10,marginTop:20}}>
      <button className="secondary" onClick={() => setHeroIndex((heroIndex + items.length - 1) % items.length)}>← 上一个</button>
      <button className="secondary" onClick={() => setHeroIndex((heroIndex + 1) % items.length)}>下一个 →</button>
      <button className="secondary" onClick={() => setHeroPlaying(!heroPlaying)}>
        {heroPlaying ? "暂停播放" : "继续播放"}
      </button>
      <span style={{fontSize:12,color:"#fff"}}>{heroIndex + 1} / {items.length}</span>
    </div>
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








































