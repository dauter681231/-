import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Gamepad2, Home, Star, ChevronRight, ChevronLeft, CheckCircle, XCircle, Trophy, MapPin, Bus, Tent } from 'lucide-react';

// --- Types & Data ---

type TopicId = 'transport' | 'leisure' | 'directions';

interface LessonSlide {
  title: string;
  content: React.ReactNode;
  example: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TopicData {
  id: TopicId;
  title: string;
  icon: React.ReactNode;
  color: string;
  lessons: LessonSlide[];
  quiz: QuizQuestion[];
}

const TOPICS: TopicData[] = [
  {
    id: 'transport',
    title: '交通工具趴趴走',
    icon: <Bus size={32} />,
    color: '#3B82F6', // Blue
    lessons: [
      {
        title: '如何詢問交通方式?',
        content: (
          <div className="space-y-4">
            <p className="text-slate-700 font-bold">句型公式：</p>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-blue-900 font-mono text-sm md:text-base shadow-sm">
              How + do/does/did + 主詞 + go/get to + 地點?
            </div>
            <p className="text-sm mt-2 text-slate-600">✨ 記得：如果是問 <b>How can...?</b> 助動詞就用 can 哦！</p>
          </div>
        ),
        example: "How can we get to the metro station? (我們如何到捷運站呢？)"
      },
      {
        title: '搭乘方式：By vs In/On',
        content: (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <strong className="block text-indigo-600 text-lg mb-1">方法 A: by + 交通工具</strong>
              <span className="text-sm text-slate-600 block mb-1">⚠️ 絕對不加 a/an/the！用單數！</span>
              <div className="text-xs bg-slate-100 p-1 rounded inline-block text-slate-500">Ex: by bus, by car, by train</div>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <strong className="block text-indigo-600 text-lg mb-1">方法 B: in/on + 冠詞 + 交通工具</strong>
              <ul className="text-sm list-disc pl-4 mt-1 text-slate-700 space-y-1">
                <li><b className="text-pink-600">on</b> a bus / train / bike <span className="text-xs text-slate-500">(身體能站直/跨坐)</span></li>
                <li><b className="text-pink-600">in</b> a car / taxi <span className="text-xs text-slate-500">(要彎腰進去)</span></li>
              </ul>
            </div>
          </div>
        ),
        example: "I go there by bus. = I go there on a bus."
      },
      {
        title: '動詞大亂鬥：Take, Ride, Drive, Fly',
        content: (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 border border-blue-100 p-3 rounded text-slate-700">
              <span className="text-xl block mb-1">🚌</span> 
              <b className="text-blue-700">take</b>: 搭乘 <br/><span className="text-xs text-slate-500">(bus, train, taxi, metro)</span>
            </div>
            <div className="bg-green-50 border border-green-100 p-3 rounded text-slate-700">
              <span className="text-xl block mb-1">🚲</span> 
              <b className="text-green-700">ride</b>: 騎 <br/><span className="text-xs text-slate-500">(bike, scooter, motorcycle)</span>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-3 rounded text-slate-700">
              <span className="text-xl block mb-1">🚗</span> 
              <b className="text-orange-700">drive</b>: 駕駛 <br/><span className="text-xs text-slate-500">(car, taxi)</span>
            </div>
            <div className="bg-purple-50 border border-purple-100 p-3 rounded text-slate-700">
              <span className="text-xl block mb-1">✈️</span> 
              <b className="text-purple-700">fly</b>: 開飛機 <br/><span className="text-xs text-slate-500">(plane)</span>
            </div>
          </div>
        ),
        example: "David flies an airplane to Japan. (David 開飛機去日本)"
      },
      {
        title: '上下車要用哪一個?',
        content: (
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-2xl mt-1">🚕</span>
              <div>
                <b className="text-lg text-slate-800">Get in / Get out of</b>
                <p className="text-sm text-slate-500 mt-1">適用：Car, Taxi (空間小的車)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-2xl mt-1">🚌</span>
              <div>
                <b className="text-lg text-slate-800">Get on / Get off</b>
                <p className="text-sm text-slate-500 mt-1">適用：Bus, Train, Plane, Boat (有甲板/走道)</p>
              </div>
            </div>
          </div>
        ),
        example: "Mom got in the car. / Andy is ready to get off the plane."
      }
    ],
    quiz: [
      {
        question: "Meg went to her grandpa's house ___ bus.",
        options: ["on a", "by", "in", "by a"],
        correctIndex: 1,
        explanation: "使用 by 時，後面直接加交通工具單數，不加冠詞 (a/the)。"
      },
      {
        question: "Judy goes to the metro station ___ a bike.",
        options: ["by", "in", "on", "at"],
        correctIndex: 2,
        explanation: "腳踏車 (bike) 是跨坐的交通工具，加上冠詞 'a' 時要搭配介系詞 on。"
      },
      {
        question: "Which one is CORRECT? (哪句是對的?)",
        options: ["He gets on the car.", "He gets in the car.", "He gets on the taxi.", "He gets out the bus."],
        correctIndex: 1,
        explanation: "轎車 (car) 的空間較小，上下車要用 get in / get out of。"
      },
      {
        question: "Dad likes to go to his office ___ foot.",
        options: ["by", "in", "on", "with"],
        correctIndex: 2,
        explanation: "走路固定用法為 on foot (= walk)。"
      }
    ]
  },
  {
    id: 'leisure',
    title: '週末玩什麼',
    icon: <Tent size={32} />,
    color: '#10B981', // Green
    lessons: [
      {
        title: 'Go + V-ing 公式',
        content: (
          <div className="w-full">
            <p className="mb-4 text-slate-600 text-center">談論休閒活動最常用的句型：</p>
            <div className="text-center text-3xl font-black text-emerald-600 mb-6 animate-bounce bg-emerald-50 py-4 rounded-xl border border-emerald-100">
              Go + V-ing
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
              <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">⛺ go camping <br/><span className="text-xs text-slate-400">去露營</span></div>
              <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">🎣 go fishing <br/><span className="text-xs text-slate-400">去釣魚</span></div>
              <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">🛍️ go shopping <br/><span className="text-xs text-slate-400">去購物</span></div>
              <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">🏄 go surfing <br/><span className="text-xs text-slate-400">去衝浪</span></div>
              <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">🏃 go jogging <br/><span className="text-xs text-slate-400">去慢跑</span></div>
              <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">🏊 go swimming <br/><span className="text-xs text-slate-400">去游泳</span></div>
            </div>
          </div>
        ),
        example: "I go swimming in my free time."
      },
      {
        title: 'Go + 單數名詞 + V-ing',
        content: (
          <div>
            <p className="mb-2 text-slate-600">有些活動是「針對某個東西」去做的，中間要加名詞！</p>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4 text-center">
              <span className="text-slate-500">Rule: </span>
              <span className="font-bold text-green-700 text-lg">Go + 單數名詞 + V-ing</span>
              <div className="text-xs mt-2 text-red-500 font-bold bg-white inline-block px-2 py-1 rounded-full border border-red-100">⚠️ 名詞前不加 a/the</div>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2 bg-white p-2 rounded border border-slate-100">🐦 <b>go bird watching</b> (去賞鳥)</li>
              <li className="flex items-center gap-2 bg-white p-2 rounded border border-slate-100">🐋 <b>go whale watching</b> (去賞鯨)</li>
              <li className="flex items-center gap-2 bg-white p-2 rounded border border-slate-100">🧗 <b>go mountain climbing</b> (去爬山)</li>
              <li className="flex items-center gap-2 bg-white p-2 rounded border border-slate-100">🐴 <b>go horseback riding</b> (去騎馬)</li>
            </ul>
          </div>
        ),
        example: "We went whale watching last summer."
      },
      {
        title: '只看不買? Window Shopping',
        content: (
          <div className="text-center space-y-4">
            <div className="text-6xl animate-pulse">👀</div>
            <h3 className="text-2xl font-black text-slate-800">go window shopping</h3>
            <p className="text-slate-500">意思是「去逛街(只看不買)」。</p>
            <p className="text-sm bg-indigo-50 text-indigo-800 p-4 rounded-xl border border-indigo-100">
              💡 記憶小撇步：<br/>
              想像你是隔著櫥窗 (window) 在看商品，<br/>所以叫 window shopping！
            </p>
          </div>
        ),
        example: "I don't have money, so I just go window shopping."
      }
    ],
    quiz: [
      {
        question: "My father likes to go ___ on weekends.",
        options: ["camp", "camping", "camps", "to camp"],
        correctIndex: 1,
        explanation: "休閒活動句型為 Go + V-ing，所以要選 camping。"
      },
      {
        question: "Let's go ___ watching this afternoon.",
        options: ["birds", "a bird", "bird", "the bird"],
        correctIndex: 2,
        explanation: "句型為 Go + 單數名詞 + V-ing。名詞要用單數且不加冠詞，所以選 bird。"
      },
      {
        question: "Do you want to go ___ climbing?",
        options: ["mountain", "mountains", "mountain's", "a mountain"],
        correctIndex: 0,
        explanation: "爬山是 go mountain climbing (用單數名詞)。"
      }
    ]
  },
  {
    id: 'directions',
    title: '迷路大冒險',
    icon: <MapPin size={32} />,
    color: '#F59E0B', // Amber
    lessons: [
      {
        title: '如何問路?',
        content: (
          <div className="space-y-4 w-full">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-800 text-center text-sm font-bold">
              🙋 先說 "Excuse me" 表示禮貌！
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                ❓ <b>Where is</b> the bank?
              </li>
              <li className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                ❓ <b>How can I get to</b> the station?
              </li>
              <li className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                ❓ <b>Which is the way to</b> the market?
              </li>
              <li className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                ❓ <b>Could you tell me the way to</b>...?
              </li>
            </ul>
            <p className="text-xs text-amber-600 font-bold text-center">💡 小提醒：get there / get here 前面不用加 to 喔！</p>
          </div>
        ),
        example: "Excuse me, how do I get to the night market from here?"
      },
      {
        title: '方位介系詞 (在哪裡?)',
        content: (
          <div className="grid grid-cols-1 gap-2 text-sm w-full">
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">across from</span> 
              <span className="text-slate-600">在...對面</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">next to</span> 
              <span className="text-slate-600">在...隔壁</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">between</span> 
              <span className="text-slate-600">在...之間 (A and B)</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">in front of</span> 
              <span className="text-slate-600">在...前面</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">in back of</span> 
              <span className="text-slate-600">在...後面</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">on the corner</span> 
              <span className="text-slate-600">在...轉角</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">in the middle of</span> 
              <span className="text-slate-600">在...中間</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded min-w-[100px] text-center">on the left / right</span> 
              <span className="text-slate-600">在左邊 / 右邊</span>
            </div>
          </div>
        ),
        example: "The library is across from the bank. (圖書館在銀行對面)"
      },
      {
        title: '指引方向 (怎麼走?)',
        content: (
          <div className="space-y-3 text-sm w-full">
            <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-100">
              <span className="text-2xl">⬆️</span> 
              <div>
                <b className="text-slate-800">Go straight / Go along</b>
                <p className="text-slate-500 text-xs">直走 / 沿著走</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-100">
              <span className="text-2xl">↩️</span> 
              <div>
                <b className="text-slate-800">Turn left</b>
                <p className="text-slate-500 text-xs">左轉 (Make a left turn)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-100">
              <span className="text-2xl">↪️</span> 
              <div>
                <b className="text-slate-800">Turn right</b>
                <p className="text-slate-500 text-xs">右轉 (Make a right turn)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded border border-slate-100">
              <span className="text-2xl">🦓</span> 
              <div>
                <b className="text-slate-800">Cross the street</b>
                <p className="text-slate-500 text-xs">過馬路</p>
              </div>
            </div>
          </div>
        ),
        example: "Go straight for two blocks and turn left."
      }
    ],
    quiz: [
      {
        question: "The bank is ___ from the school.",
        options: ["across", "cross", "next", "between"],
        correctIndex: 0,
        explanation: "Across from 是片語「在...對面」。Cross 是動詞「穿越」。"
      },
      {
        question: "Go straight ___ two blocks.",
        options: ["at", "for", "in", "to"],
        correctIndex: 1,
        explanation: "持續走一段距離或時間，介系詞用 for (例如: for two blocks, for 10 minutes)。"
      },
      {
        question: "How can we get ___?",
        options: ["to there", "there", "to here", "at there"],
        correctIndex: 1,
        explanation: "here 和 there 是地方副詞，前面不需要加 to。"
      },
      {
        question: "Turn right ___ Station Road.",
        options: ["in", "at", "on", "for"],
        correctIndex: 2,
        explanation: "在某條路上轉彎，介系詞用 on。"
      }
    ]
  }
];

// --- Components ---

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'topic'>('home');
  const [activeTopic, setActiveTopic] = useState<TopicData | null>(null);

  const handleTopicSelect = (topic: TopicData) => {
    setActiveTopic(topic);
    setCurrentView('topic');
  };

  const goHome = () => {
    setCurrentView('home');
    setActiveTopic(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {currentView === 'home' ? (
        <HomeView onSelectTopic={handleTopicSelect} />
      ) : (
        activeTopic && <TopicView topic={activeTopic} onBack={goHome} />
      )}
    </div>
  );
};

const HomeView = ({ onSelectTopic }: { onSelectTopic: (t: TopicData) => void }) => {
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col items-center justify-center min-h-screen">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl font-black text-indigo-600 tracking-tight">國二英文大進擊</h1>
        <p className="text-slate-500 font-medium">快樂學文法，考試頂瓜瓜！🎉</p>
      </div>

      <div className="w-full space-y-4">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="w-full relative group overflow-hidden rounded-2xl p-6 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: topic.color }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform">
              {topic.icon}
            </div>
            <div className="relative z-10 flex items-center gap-4 text-white">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm shadow-inner">
                {topic.icon}
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold">{topic.title}</h2>
                <p className="text-white/80 text-sm font-medium">Start Learning →</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-12 text-center text-slate-400 text-sm">
        <p>Based on Grade 8 English Grammar Curriculum</p>
      </div>
    </div>
  );
};

const TopicView = ({ topic, onBack }: { topic: TopicData; onBack: () => void }) => {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between shadow-md z-10 sticky top-0 transition-colors"
        style={{ backgroundColor: topic.color }}
      >
        <button 
          onClick={onBack}
          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <Home size={20} />
        </button>
        <h2 className="text-white font-bold text-lg">{topic.title}</h2>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Mode Switcher */}
      <div className="flex p-4 gap-4 max-w-2xl mx-auto w-full">
        <button
          onClick={() => setMode('learn')}
          className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'learn' 
              ? 'bg-white shadow-md text-indigo-600 ring-2 ring-indigo-100' 
              : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
          }`}
        >
          <BookOpen size={20} />
          學習區
        </button>
        <button
          onClick={() => setMode('quiz')}
          className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            mode === 'quiz' 
              ? 'bg-white shadow-md text-pink-500 ring-2 ring-pink-100' 
              : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
          }`}
        >
          <Gamepad2 size={20} />
          挑戰區
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 pb-12 max-w-2xl mx-auto w-full">
        {mode === 'learn' ? (
          <LearnModule topic={topic} />
        ) : (
          <QuizModule topic={topic} />
        )}
      </div>
    </div>
  );
};

const LearnModule = ({ topic }: { topic: TopicData }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    if (slideIndex < topic.lessons.length - 1) setSlideIndex(p => p + 1);
  };

  const prevSlide = () => {
    if (slideIndex > 0) setSlideIndex(p => p - 1);
  };

  const currentLesson = topic.lessons[slideIndex];

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="w-full aspect-[4/5] md:aspect-video bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col relative border-4" style={{ borderColor: topic.color }}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 z-10">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${((slideIndex + 1) / topic.lessons.length) * 100}%`,
              backgroundColor: topic.color 
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-start md:justify-center items-center text-center overflow-y-auto w-full">
          <h3 className="text-2xl font-black mb-6 mt-4 md:mt-0" style={{ color: topic.color }}>
            {currentLesson.title}
          </h3>
          <div className="text-slate-600 font-medium leading-relaxed w-full flex-1 flex flex-col items-center justify-center">
            {currentLesson.content}
          </div>
        </div>

        {/* Example Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Example</div>
          <p className="font-serif italic text-slate-700 text-lg leading-snug">"{currentLesson.example}"</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={prevSlide}
          disabled={slideIndex === 0}
          className="p-4 rounded-full bg-white shadow-lg text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-slate-400">
          {slideIndex + 1} / {topic.lessons.length}
        </span>
        <button 
          onClick={nextSlide}
          disabled={slideIndex === topic.lessons.length - 1}
          className="p-4 rounded-full bg-white shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 transition-all"
          style={{ color: topic.color }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const QuizModule = ({ topic }: { topic: TopicData }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = topic.quiz[qIndex];

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (qIndex < topic.quiz.length - 1) {
      setQIndex(p => p + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setQIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white rounded-3xl shadow-xl p-8 text-center animate-fade-in border-4 border-slate-50">
        <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mb-6 text-yellow-500 animate-bounce shadow-inner">
          <Trophy size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">恭喜完成!</h2>
        <p className="text-slate-500 mb-8">你完成了 {topic.title} 的挑戰</p>
        
        <div className="text-6xl font-black mb-2 tracking-tight" style={{ color: topic.color }}>
          {score} <span className="text-3xl text-slate-300">/</span> {topic.quiz.length}
        </div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Score</p>

        <button 
          onClick={resetQuiz}
          className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: topic.color }}
        >
          再玩一次
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {topic.quiz.map((_, i) => (
          <div 
            key={i}
            className={`h-2 flex-1 rounded-full transition-all ${
              i === qIndex ? 'bg-indigo-500' : i < qIndex ? 'bg-indigo-200' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-slate-100 mb-6 min-h-[160px] flex items-center justify-center">
        <h3 className="text-xl font-bold text-center text-slate-700 leading-relaxed">
          {currentQ.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {currentQ.options.map((opt, i) => {
          let stateStyles = 'bg-white border-2 border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50';
          let icon = null;

          if (showResult) {
            if (i === currentQ.correctIndex) {
              stateStyles = 'bg-green-50 border-2 border-green-500 text-green-700';
              icon = <CheckCircle size={20} className="text-green-500" />;
            } else if (i === selectedOption) {
              stateStyles = 'bg-red-50 border-2 border-red-500 text-red-700';
              icon = <XCircle size={20} className="text-red-500" />;
            } else {
              stateStyles = 'bg-slate-50 border-2 border-transparent text-slate-300 opacity-50';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl font-bold text-lg flex items-center justify-between transition-all active:scale-98 ${stateStyles}`}
            >
              <span>{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {showResult && (
        <div className="mt-6 animate-fade-in-up">
          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4 border border-blue-100 shadow-sm">
            <span className="font-bold mr-1 block mb-1">💡 詳解：</span>
            {currentQ.explanation}
          </div>
          <button 
            onClick={nextQuestion}
            className="w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
            style={{ backgroundColor: topic.color }}
          >
            {qIndex === topic.quiz.length - 1 ? '查看成績' : '下一題'}
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);
root.render(<App />);
