import React, { useState } from 'react';
import { Camera, Mic, MessageSquare, Image as ImageIcon, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';

export default function AICenter() {
  const [activeTab, setActiveTab] = useState('disease');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setUploadedImage(imgUrl);
      setAnalysisResult(null);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Mock analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        disease: 'Early Blight (Alternaria solani)',
        confidence: 94,
        severity: 'Moderate',
        action: 'Apply Mancozeb or Chlorothalonil based fungicide immediately. Ensure proper spacing for air circulation.',
      });
    }, 2000);
  };

  return (
    <div className="pb-10">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          <span className="text-4xl">🤖</span> KRISHAMITRA AI
        </h1>
        <p className="text-gray-500">Your intelligent farming assistant.</p>
      </div>

      {/* ── TABS ── */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto hide-scrollbar pb-2">
        {[
          { id: 'disease', label: 'Crop Disease Detection', icon: <Camera size={16} /> },
          { id: 'assistant', label: 'Voice Assistant', icon: <Mic size={16} /> },
          { id: 'chat', label: 'Ask Expert', icon: <MessageSquare size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
              activeTab === tab.id 
                ? 'bg-pink-50 border-pink-300 text-pink-700 shadow-sm' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── MAIN CONTENT AREA ── */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'disease' && (
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Detect Crop Disease</h2>
              <p className="text-sm text-gray-500 mb-6">Upload a clear photo of the affected leaf or fruit.</p>

              {!uploadedImage ? (
                <div className="border-2 border-dashed border-pink-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-pink-50/30 text-center relative hover:bg-pink-50/50 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-pink-400 mb-4 shadow-sm border border-pink-100">
                    <ImageIcon size={32} />
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">Tap to upload image</h3>
                  <p className="text-xs text-gray-500">or take a photo using your camera</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 max-h-[300px] bg-gray-900 flex justify-center">
                    <img src={uploadedImage} alt="Uploaded crop" className="max-h-[300px] object-contain" />
                    <button 
                      onClick={() => { setUploadedImage(null); setAnalysisResult(null); }}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-lg text-xs font-semibold text-gray-700 hover:bg-white"
                    >
                      Change Image
                    </button>
                  </div>

                  {!analysisResult ? (
                    <button 
                      onClick={analyzeImage} 
                      disabled={isAnalyzing}
                      className="btn-brand w-full py-3 flex items-center justify-center gap-2 text-base"
                    >
                      {isAnalyzing ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"></path>
                          </svg>
                          Analyzing Image...
                        </>
                      ) : (
                        <>Analyze with AI <ChevronRight size={18} /></>
                      )}
                    </button>
                  ) : (
                    <div className="bg-gradient-to-br from-pink-50 to-amber-50 rounded-2xl p-5 border border-pink-200 shadow-inner">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="font-bold text-gray-900">Analysis Complete</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-3 rounded-xl border border-pink-100">
                          <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Detected Issue</div>
                          <div className="text-sm font-bold text-red-600 leading-tight">{analysisResult.disease}</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-pink-100">
                          <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Confidence</div>
                          <div className="text-lg font-bold text-gray-800">{analysisResult.confidence}%</div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-pink-100 flex gap-3 items-start">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                        <div>
                          <div className="text-xs font-bold text-gray-800 mb-1">Recommended Action ({analysisResult.severity})</div>
                          <div className="text-xs text-gray-600 leading-relaxed">{analysisResult.action}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'assistant' && (
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm text-center py-12">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-amber-400 flex items-center justify-center shadow-lg shadow-pink-200 mb-6 relative">
                <div className="absolute inset-0 rounded-full border-2 border-pink-300 animate-ping opacity-20"></div>
                <Mic size={40} className="text-white" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">I am listening...</h2>
              <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
                Speak in Telugu, Hindi or English. E.g., "Na daggara 500 kg tomato undi, ammali."
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-w-md mx-auto text-left">
                <div className="text-xs text-gray-400 mb-2 font-semibold">Live Transcript</div>
                <div className="text-gray-800 italic">"Na daggara 500 kilo tomato undi..."</div>
              </div>
            </div>
          )}
          
          {activeTab === 'chat' && (
            <div className="bg-white rounded-3xl border border-pink-100 shadow-sm h-[500px] flex flex-col overflow-hidden">
               <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-amber-400 flex items-center justify-center text-white font-bold">AI</div>
                 <div>
                   <div className="font-semibold text-gray-800 text-sm">KRISHAMITRA Expert</div>
                   <div className="text-[10px] text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</div>
                 </div>
               </div>
               <div className="flex-1 p-4 bg-gray-50/50 flex flex-col justify-end gap-3">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-sm self-start max-w-[80%] shadow-sm text-sm text-gray-700">
                    Hello! I am your KRISHAMITRA AI expert. How can I help you with your farming today?
                  </div>
               </div>
               <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
                 <input type="text" placeholder="Type your question..." className="form-input flex-1 py-2 text-sm" />
                 <button className="bg-pink-500 text-white p-2 rounded-xl hover:bg-pink-600 transition-colors">
                   <ChevronRight size={20} />
                 </button>
               </div>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Other AI Capabilities</h3>
            <div className="space-y-3">
              {[
                { icon: '📊', title: 'Smart Buyer Matching', desc: 'Find buyers based on your crop quality and distance.' },
                { icon: '🌦️', title: 'Weather Advisory', desc: 'Get actionable alerts before bad weather hits.' },
                { icon: '♻️', title: 'Surplus Detection', desc: 'Automatically find processing units for unsold crops.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-3 bg-white rounded-xl border border-pink-50 hover:border-pink-200 transition-colors cursor-pointer">
                  <div className="text-2xl leading-none mt-1">{item.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
