import React, { useState, useEffect, useRef } from 'react';

// --- Reusable UI Components ---

interface LabeledDisplayProps {
  label: string;
  value: string | number;
  labelClassName?: string;
  valueClassName?: string;
  containerClassName?: string;
  valueAlign?: 'text-left' | 'text-center' | 'text-right';
}

const LabeledDisplay: React.FC<LabeledDisplayProps> = ({ label, value, labelClassName = '', valueClassName = '', containerClassName = '', valueAlign = 'text-left' }) => (
  <div className={`flex items-stretch ${containerClassName}`}>
    <div className={`bg-blue-800 text-white font-bold py-2 px-3 text-base flex items-center ${labelClassName}`}>
      <span>{label}</span>
    </div>
    <div className={`bg-white text-black border-2 border-gray-500 shadow-inner px-2 py-2 text-lg font-mono font-bold w-full ${valueAlign} ${valueClassName}`}>
      {value}
    </div>
  </div>
);

interface SidebarButtonProps {
    children: React.ReactNode;
}
const SidebarButton: React.FC<SidebarButtonProps> = ({ children }) => (
    <button className="bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500 text-black font-bold py-1 w-full text-center text-sm">
        {children}
    </button>
);

const ColorBlock: React.FC<{ title: string; values: string[] }> = ({ title, values }) => (
    <div className="flex flex-col items-center">
        <div className="text-white font-bold text-base">{title}</div>
        {values.map((val, index) => (
            <div key={index} className="bg-white text-black border-2 border-gray-500 shadow-inner px-4 py-1 text-base font-mono font-bold mt-1 w-16 text-center">
                {val}
            </div>
        ))}
    </div>
);

const ColorGrid: React.FC = () => (
    <div className="flex items-start">
        <div className="flex flex-col mr-4">
            <div className="text-white font-bold text-base h-8 flex items-center">COLOR</div>
            <div className="text-white font-bold text-sm mt-1 h-8 flex items-center">APIIDEMIA</div>
            <div className="text-white font-bold text-sm mt-3 h-8 flex items-center">PPCIIPC S. MCCS</div>
        </div>
        <div className="grid grid-cols-5 gap-4">
            <ColorBlock title="1C" values={["S1", "S1"]} />
            <ColorBlock title="2C" values={["K", "K"]} />
            <ColorBlock title="3C" values={["C", "C"]} />
            <ColorBlock title="4C" values={["M", "H"]} />
            <ColorBlock title="5C" values={["Y", "Y"]} />
        </div>
    </div>
);

// --- Main App Component ---

const App: React.FC = () => {
    const [passedSheet, setPassedSheet] = useState(0);
    const [goodSheet, setGoodSheet] = useState(0);
    const [isPassedCounting, setIsPassedCounting] = useState(false);
    const [isGoodCounting, setIsGoodCounting] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const passedIntervalRef = useRef<number | null>(null);
    const goodIntervalRef = useRef<number | null>(null);

    // Timer for the header clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Effect for Passed Sheet counter
    useEffect(() => {
        if (isPassedCounting) {
            passedIntervalRef.current = window.setInterval(() => {
                setPassedSheet(prev => prev + 1);
            }, 1500);
        } else {
            if (passedIntervalRef.current) clearInterval(passedIntervalRef.current);
        }
        return () => {
            if (passedIntervalRef.current) clearInterval(passedIntervalRef.current);
        };
    }, [isPassedCounting]);
    
    // Effect for Good Sheet counter
    useEffect(() => {
        if (isGoodCounting) {
            goodIntervalRef.current = window.setInterval(() => {
                setGoodSheet(prev => prev + 1);
            }, 1800); // Slightly different speed for realism
        } else {
            if (goodIntervalRef.current) clearInterval(goodIntervalRef.current);
        }
        return () => {
            if (goodIntervalRef.current) clearInterval(goodIntervalRef.current);
        };
    }, [isGoodCounting]);
    
    const handlePassedStart = () => setIsPassedCounting(true);
    const handlePassedStop = () => {
        setIsPassedCounting(false);
        setIsGoodCounting(false); // Also stop the good sheet counter
    };
    
    const handleGoodStart = () => setIsGoodCounting(true);
    const handleGoodStop = () => setIsGoodCounting(false);

    const handleReset = () => {
        setIsPassedCounting(false);
        setIsGoodCounting(false);
        setPassedSheet(0);
        setGoodSheet(0);
    };

    const wasteSheet = passedSheet - goodSheet;
    const formattedDate = `${(currentTime.getMonth() + 1)}/${currentTime.getDate()}/${currentTime.getFullYear()}`;
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false });

    return (
        <div className="bg-gray-400 h-screen p-2 font-sans flex flex-col">
            <div className="bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500 p-1 flex-grow flex flex-col">
                {/* Header */}
                <div className="bg-blue-900 text-white flex justify-between items-center p-2 mb-1">
                    <div className="flex items-center h-6 w-20">
                      <div className="w-5 h-5 bg-red-600 transform rotate-45"></div>
                      <div className="w-5 h-5 bg-red-600 transform rotate-45 -ml-3"></div>
                      <div className="w-5 h-5 bg-red-600 transform rotate-45 -ml-3"></div>
                    </div>
                    <h1 className="text-2xl font-bold">RESULT OF PRODUCTION</h1>
                    <div className="font-mono text-lg w-48 text-right">{formattedDate} {formattedTime}</div>
                </div>

                {/* Main Body */}
                <div className="flex space-x-1 flex-grow">
                    {/* Left Sidebar */}
                    <div className="flex flex-col space-y-px bg-blue-900 p-1">
                        <div className="bg-blue-800 text-white text-center py-1 font-bold text-sm">PRES</div>
                        <div className="bg-blue-800 text-white text-center py-1 font-bold text-sm">RESU</div>
                        <div className="bg-blue-800 text-white text-center py-1 font-bold text-sm mb-1">ORDE</div>
                        {['067','066','065','064','0634','063','2178','062','061','060','059','058','057','056','055','054','053','052','051'].map(order => (
                            <div key={order} className={`text-center py-0.5 px-2 text-sm font-mono ${order === '054' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                {order}
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow bg-blue-600 p-2 border-2 border-gray-600 shadow-inner flex flex-col justify-between">
                        <div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                              <LabeledDisplay label="PRESS No." value="1120" labelClassName="w-32" />
                              <LabeledDisplay label="RECORD DATE" value="7/3/2025 13:23" labelClassName="w-32" />
                              <LabeledDisplay label="DELIV. TIME" value="7/3/2025 12:31" labelClassName="w-32" />
                          </div>
                          <div className="border-t-2 border-gray-400 my-4"></div>
                          <div className="space-y-3">
                            <LabeledDisplay label="JOB NAME" value="USHODAYA-200gms DOSA MIX" labelClassName="w-32" />
                            <LabeledDisplay label="CUST. NAME" value="" labelClassName="w-32" />
                            <LabeledDisplay label="MEMO" value="" labelClassName="w-32" />
                          </div>
                          <div className="border-t-2 border-gray-400 my-4"></div>
                           <div className="relative">
                                <div className="space-y-3 pr-40">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                        <LabeledDisplay label="ORDER No." value="054" labelClassName="w-32" />
                                        <div className="flex items-stretch space-x-1">
                                            <div className="bg-blue-800 text-white font-bold py-2 px-3 text-base flex items-center">REPEAT ORDER No.</div>
                                            <button className="bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500 text-black font-bold px-6 text-base">NEW</button>
                                        </div>
                                        <LabeledDisplay label="JOB No." value="1945" labelClassName="w-32" />
                                        <div className="flex items-stretch space-x-1">
                                            <div className="bg-blue-800 text-white font-bold py-2 px-3 text-base flex items-center">REPEAT JOB No.</div>
                                            <button className="bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500 text-black font-bold px-6 text-base">NEW</button>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-2">
                                        <div className="bg-blue-800 text-white font-bold py-2 px-3 text-base">SHEET SIZE</div>
                                        <div className="flex items-center space-x-1">
                                            <div className="bg-blue-800 text-white font-bold py-2 px-3 text-sm">LATE.</div>
                                            <div className="bg-white text-black border-2 border-gray-500 shadow-inner px-2 py-2 text-lg font-mono font-bold w-24 text-right">635</div>
                                            <span className="text-white font-bold text-lg">mm</span>
                                        </div>
                                        <span className="text-white font-bold text-xl">X</span>
                                        <div className="flex items-center space-x-1">
                                            <div className="bg-blue-800 text-white font-bold py-2 px-3 text-sm">CIRC.</div>
                                            <div className="bg-white text-black border-2 border-gray-500 shadow-inner px-2 py-2 text-lg font-mono font-bold w-24 text-right">433</div>
                                            <span className="text-white font-bold text-lg">mm</span>
                                        </div>
                                    </div>
                                    <LabeledDisplay label="IMAGE RATIO" value="NON" containerClassName="max-w-xs" labelClassName="w-32"/>
                                </div>
                                <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                                    <div className="bg-blue-800 text-white p-1 text-center w-32">
                                        <div className="font-bold text-base">IMP.PRE.</div>
                                        <div className="bg-white text-black border-2 border-gray-500 shadow-inner px-2 py-2 text-lg font-mono font-bold mt-1">
                                            0.30 <span className="text-sm">mm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                          <div className="border-t-2 border-gray-400 my-4"></div>
                           <ColorGrid />
                          <div className="border-t-2 border-gray-400 my-4"></div>
                          <div className="flex items-center justify-center space-x-4">
                               <div className="bg-white text-black border-2 border-gray-500 shadow-inner px-4 py-2 text-lg font-mono font-bold">7/3/2025 12:32</div>
                               <span className="text-white font-bold text-2xl">&rarr;</span>
                               <div className="bg-white text-black border-2 border-gray-500 shadow-inner px-4 py-2 text-lg font-mono font-bold">7/3/2025 13:23</div>
                          </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80 flex-shrink-0 flex flex-col space-y-1">
                        <div className="p-1 bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500">
                            <button className="flex items-center justify-center space-x-2 w-full bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500 p-2">
                                <div className="w-5 h-5 border-4 border-blue-600 rounded-full"></div>
                                <span className="font-bold text-lg">EXIT</span>
                            </button>
                        </div>
                        <div className="p-2 bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500 space-y-3">
                            <LabeledDisplay label="SCH. SHEET" value={1450} valueAlign="text-right" labelClassName="w-40 justify-start !py-2" valueClassName="!bg-white !text-black !text-3xl !py-2"/>
                            
                            <LabeledDisplay label="PASSED SHEET" value={passedSheet} valueAlign="text-right" labelClassName="w-40 justify-start !py-2" valueClassName="!bg-white !text-black !text-3xl !py-2"/>
                            <div className="flex space-x-2">
                                <button onClick={handlePassedStart} disabled={isPassedCounting} className="flex-1 bg-green-600 text-white font-bold py-1 rounded shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm">START</button>
                                <button onClick={handlePassedStop} disabled={!isPassedCounting} className="flex-1 bg-red-600 text-white font-bold py-1 rounded shadow-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm">STOP</button>
                            </div>

                            <LabeledDisplay label="GOOD SHEET" value={goodSheet} valueAlign="text-right" labelClassName="w-40 justify-start !py-2" valueClassName="!bg-white !text-black !text-3xl !py-2"/>
                             <div className="flex space-x-2">
                                <button onClick={handleGoodStart} disabled={isGoodCounting} className="flex-1 bg-green-600 text-white font-bold py-1 rounded shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm">START</button>
                                <button onClick={handleGoodStop} disabled={!isGoodCounting} className="flex-1 bg-red-600 text-white font-bold py-1 rounded shadow-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm">STOP</button>
                            </div>

                            <LabeledDisplay label="WASTE SHEET" value={wasteSheet < 0 ? 0 : wasteSheet} valueAlign="text-right" labelClassName="w-40 justify-start !py-2" valueClassName="!bg-white !text-black !text-3xl !py-2"/>
                             <div className="border-t-2 border-gray-400 my-2"></div>
                             <button onClick={handleReset} className="w-full bg-blue-600 text-white font-bold py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors">RESET ALL</button>
                        </div>
                        <div className="p-1 bg-gray-300 border-2 border-t-gray-100 border-l-gray-100 border-b-gray-500 border-r-gray-500 flex-grow">
                            <div className="grid grid-cols-2 gap-2">
                                <SidebarButton>CON.</SidebarButton>
                                <SidebarButton>PUT</SidebarButton>
                                <SidebarButton>DUCT</SidebarButton>
                                <SidebarButton>SULT</SidebarButton>
                                <SidebarButton>ORK</SidebarButton>
                                <SidebarButton>PORT</SidebarButton>
                                <div className="col-span-2 h-16"></div>
                                <div className="col-span-2"><SidebarButton>ACK</SidebarButton></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;