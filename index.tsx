
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
          <div className="space-y-2">
            <p>句型公式：</p>
            <div className="bg-white/20 p-3 rounded-lg font-mono text-sm md:text-base">
              How + do/does/did + 主詞 + go/get to + 地點?
            </div>
            <p className="text-sm mt-2">✨ 記得：如果是問 <b>How can...?</b> 助動詞就用 can 哦！</p>
          </div>
        ),
        example: "How can we get to the metro station? (我們如何到捷運站呢？)"
      },
      {
        title: '搭乘方式：By vs In/On',
        content: (
          <div className="space-y-4">
            <div className="bg-white/10 p-2 rounded">
              <strong className="block text-yellow-200">方法 A: by + 交通工具</strong>
              <span className="text-sm">⚠️ 絕對不加 a/an/the！用單數！</span>
              <div className="text-xs mt-1">Ex: by bus, by car, by train</div>
            </div>
            <div className="bg-white/10 p-2 rounded">
              <strong className="block text-yellow-200">方法 B: in/on + 冠詞 + 交通工具</strong>
              <ul className="text-sm list-disc pl-4 mt-1">
                <li><b>on</b> a bus/train/bike (身體能站直/跨坐)</li>
                <li><b>in</b> a car/taxi (要彎腰進去)</li>
              </ul>
            </div>
          </div>
        ),
        example: "I go there by bus. = I go there on a bus."
      },
      {
        title: '動詞大亂鬥：Take, Ride, Drive, Fly',
        content: (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-white/10 p-2 rounded">
              <span className="text-xl">🚌</span> <b>take</b>: 搭乘 (bus, train, taxi, metro)
            </div>
            <div className="bg-white/10 p-2 rounded">
              <span className="text-xl">🚲</span> <b>ride</b>: 騎 (bike, scooter, motorcycle)
            </div>
            <div className="bg-white/10 p-2 rounded">
              <span className="text-xl">🚗</span> <b>drive</b>: 駕駛 (car, taxi)
            </div>
            <div className="bg-white/10 p-2 rounded">
              <span className="text-xl">✈️</span> <b>fly</b>: 開飛機 (plane)
            </div>
          </div>
        ),
        example: "David flies an airplane to Japan. (David 開飛機去日本)"
      },
      {
        title: '上下車要用哪一個?',
        content: (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚕</span>
              <div>
                <b>Get in / Get out of</b>
                <p className="text-xs text-blue-100">適用：Car, Taxi (小車)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚌</span>
              <div>
                <b>Get on / Get off</b>
                <p className="text-xs text-blue-100">適用：Bus, Train, Plane, Boat (大車/板子)</p>
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
          <div>
            <p className="mb-4">當我們談論休閒活動時，最常用的句型就是：</p>
            <div className="text-center text-2xl font-bold text-yellow-200 mb-4 animate-bounce">
              Go + V-ing
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>⛺ go camping (去露營)</div>
              <div>🎣 go fishing (去釣魚)</div>
              <div>🛍️ go shopping (去購物)</div>
              <div>🏄 go surfing (去衝浪)</div>
              <div>🏃 go jogging (去慢跑)</div>
              <div>🏊 go swimming (去游泳)</div>
            </div>
          </div>
        ),
        example: "I go swimming in my free time."
      },
      {
        title: 'Go + 單數名詞 + V-ing',
        content: (
          <div>
            <p className="mb-2">有些活動是「針對某個東西」去做的，中間要加名詞！</p>
            <div className="bg-white/20 p-3 rounded-lg mb-3">
              規則：Go + <span className="text-yellow-300 font-bold">單數名詞</span> + V-ing
              <div className="text-xs mt-1">⚠️ 這裡的名詞前面不能加 a/the 哦！</div>
            </div>
            <ul className="space-y-2 text-sm">
              <li>🐦 <b>go bird watching</b> (去賞鳥)</li>
              <li>🐋 <b>go whale watching</b> (去賞鯨)</li>
              <li>🧗 <b>go mountain climbing</b> (去爬山)</li>
              <li>🐴 <b>go horseback riding</b> (去騎馬)</li>
            </ul>
          </div>
        ),
        example: "We went whale watching last summer."
      },
      {
        title: '只看不買? Window Shopping',
        content: (
          <div className="text-center space-y-4">
            <div className="text-6xl">👀</div>
            <h3 className="text-xl font-bold">go window shopping</h3>
            <p>意思是「去逛街(只看不買)」。</p>
            <p className="text-sm bg-white/10 p-2 rounded">
              想像你是隔著櫥窗 (window) 在看商品，所以叫 window shopping！
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
          <div className="space-y-3">
            <p>記得先說 <b>Excuse me</b> (不好意思) 表示禮貌！</p>
            <ul className="space-y-2 bg-white/10 p-3 rounded text-sm">
              <li>❓ <b>Where is</b> the bank?</li>
              <li>❓ <b>How can I get to</b> the station?</li>
              <li>❓ <b>Which is the way to</b> the market?</li>
              <li>❓ <b>Could you tell me the way to</b>...?</li>
            </ul>
            <p className="text-xs text-yellow-100">💡 記得：get there / get here 前面不用加 to 喔！</p>
          </div>
        ),
        example: "Excuse me, how do I get to the night market from here?"
      },
      {
        title: '方位介系詞 (在哪裡?)',
        content: (
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
              <span className="font-bold w-24">across from</span> 在...對面
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
              <span className="font-bold w-24">next to</span> 在...隔壁
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
              <span className="font-bold w-24">between A and B</span> 在A與B之間
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
              <span className="font-bold w-24">on the corner of</span> 在...轉角
            </div>
          </div>
        ),
        example: "The library is across from the bank. (圖書館在銀行對面)"
      },
      {
        title: '指引方向 (怎麼走?)',
        content: (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">⬆️</span> <b>Go straight / Go along</b> (直走/沿著走)
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">↩️</span> <b>Turn left / Make a left turn</b> (左轉)
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">↪️</span> <b>Turn right</b> (右轉)
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🦓</span> <b>Cross the street</b> (過馬路)
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
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                {topic.icon}
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold">{topic.title}</h2>
                <p className="text-white/80 text-sm">Start Learning →</p>
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
        className="p-4 flex items-center justify-between shadow-md z-10 sticky top-0"
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
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${((slideIndex + 1) / topic.lessons.length) * 100}%`,
              backgroundColor: topic.color 
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center overflow-y-auto">
          <h3 className="text-2xl font-black mb-6" style={{ color: topic.color }}>
            {currentLesson.title}
          </h3>
          <div className="text-slate-600 font-medium leading-relaxed w-full">
            {currentLesson.content}
          </div>
        </div>

        {/* Example Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Example</div>
          <p className="font-serif italic text-slate-700 text-lg">"{currentLesson.example}"</p>
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
      <div className="flex flex-col items-center justify-center h-full bg-white rounded-3xl shadow-xl p-8 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mb-6 text-yellow-500 animate-bounce">
          <Trophy size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">恭喜完成!</h2>
        <p className="text-slate-500 mb-8">你完成了 {topic.title} 的挑戰</p>
        
        <div className="text-5xl font-black mb-2" style={{ color: topic.color }}>
          {score} / {topic.quiz.length}
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
          let stateStyles = 'bg-white border-2 border-slate-100 text-slate-600 hover:border-indigo-200';
          let icon = null;

          if (showResult) {
            if (i === currentQ.correctIndex) {
              stateStyles = 'bg-green-50 border-2 border-green-400 text-green-700';
              icon = <CheckCircle size={20} className="text-green-500" />;
            } else if (i === selectedOption) {
              stateStyles = 'bg-red-50 border-2 border-red-400 text-red-700';
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
          <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4 border border-blue-100">
            <span className="font-bold mr-1">💡 詳解：</span>
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
