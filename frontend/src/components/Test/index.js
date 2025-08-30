
import React, { useState, useEffect } from 'react';
import { BarChart3, Scale, Users, FileText, TrendingUp, Database } from 'lucide-react';

// Mock data to simulate your Redux state
const mockCounties = [
  {
    County: "Cook County",
    Offense: "Drug Possession",
    TotalCasesYear: 2847,
    AverageIncarcerationLength: 45,
    AverageProbation: 18
  },
  {
    County: "Harris County", 
    Offense: "Drug Possession",
    TotalCasesYear: 1923,
    AverageIncarcerationLength: 32,
    AverageProbation: 24
  },
  {
    County: "Maricopa County",
    Offense: "Drug Possession", 
    TotalCasesYear: 1654,
    AverageIncarcerationLength: 67,
    AverageProbation: 12
  }
];

function LandingTest() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  // Simulate data loading
  useEffect(() => {
    setTimeout(() => setLoaded(true), 1200);
  }, []);

  // Auto-rotate sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-light">Loading justice data...</p>
        </div>
      </div>
    );
  }

  const county1 = mockCounties[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
                <Scale className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-light text-slate-900 mb-8 tracking-tight">
              Why <span className="font-semibold text-blue-600">Quantitative</span> Justice?
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 font-light leading-relaxed mb-6">
              Explore objective sentencing trends by individual judges, counties, and crimes — built from scraped public records.
            </p>
            
            <p className="text-lg text-slate-500 font-light mb-12">
              Allowing individuals to do their own research and make up their own minds.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
              <p className="text-blue-800 font-medium">
                📊 Coming Soon: Data from individual defense attorneys & prosecutors
              </p>
              <p className="text-blue-700 mt-2 font-light">
                Instead of 3 vs 4.5 stars, hire your attorney based on their outcomes compared to the state average.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Questions Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-8">
              Critical Questions We Answer
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-red-100 rounded-lg mt-1">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">
                    Do certain counties over-prosecute or have aberrations in sentencing?
                  </h3>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg mt-1">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">
                    Do Public Defenders actually get worse outcomes compared to Private attorneys?
                  </h3>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <div className="flex items-center mb-6">
              <Database className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-slate-800">Our Methodology</h3>
            </div>
            
            <div className="space-y-4 text-slate-600">
              <p>Using public records and scraped data from open source background sites, Quantitative Justice answers these questions with objective statistical data.</p>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 font-medium mb-2">🔓 Open Data Policy</p>
                <p className="text-green-700 text-sm">
                  All datasets are free to download. Names of defendants and identifying information of victims have been anonymized. We are not a background check site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Spotlight Section */}
      <div className="bg-white border-t border-b border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-4">
              Random Crime Spotlight
            </h2>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-lg font-medium">
              {county1.Offense}
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockCounties.map((county, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 pb-3 border-b border-slate-200">
                  {county.County}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Cases</span>
                    <span className="font-bold text-2xl text-blue-600">{county.TotalCasesYear.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Avg. Incarceration</span>
                    <span className="font-semibold text-lg text-slate-800">{county.AverageIncarcerationLength} days</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Avg. Probation</span>
                    <span className="font-semibold text-lg text-slate-800">{county.AverageProbation} months</span>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 italic">
                      Percentage involving incarceration and probation analysis in progress
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl lg:text-4xl font-light text-slate-900 text-center mb-16">
          Explore the Data
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                County Analysis
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Compare county sentencing with others. Search prosecutorial and police misconduct records.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200">
                Explore Counties
              </button>
            </div>
          </div>

          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Scale className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Judge Comparison
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Compare individual judges' sentencing data with each other and state averages.
              </p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200">
                View Judges
              </button>
            </div>
          </div>

          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Attorney Outcomes
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Compare prosecutors and defense attorneys' outcomes and success rates.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200">
                Attorney Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Scale className="h-8 w-8 text-blue-400" />
          </div>
          <p className="text-slate-400 text-lg font-light">
            Quantitative Justice - Data-driven transparency in the legal system
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingTest;