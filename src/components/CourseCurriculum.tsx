import { motion } from 'framer-motion';
import { 
  Sprout, 
  Stethoscope, 
  Trees, 
  Flower2,
  Tractor
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const CourseCurriculum = () => {
  const [activeTab, setActiveTab] = useState<string>('agri');

  const subjects = [
    {
      id: 'agri',
      title: 'Agriculture',
      icon: <Tractor className="h-5 w-5" />,
      color: 'bg-green-100 text-green-700',
      topics: [
        'General Agriculture',
        'Crop Production & Management',
        'Agricultural Tools & Implements',
        'Soil Science Basics',
        'Organic Farming Practices'
      ]
    },
    {
      id: 'hort',
      title: 'Horticulture',
      icon: <Flower2 className="h-5 w-5" />,
      color: 'bg-pink-100 text-pink-700',
      topics: [
        'Horticulture Crops & Varieties',
        'Nursery Management',
        'Tools & Implements',
        'Plant Propagation Methods',
        'Greenhouse Technology'
      ]
    },
    {
      id: 'vet',
      title: 'Veterinary',
      icon: <Stethoscope className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-700',
      topics: [
        'Animal Breeds (Cattle, Poultry, etc.)',
        'Veterinary Tools & Implements',
        'Animal Health & Nutrition',
        'Livestock Management',
        'First Aid for Animals'
      ]
    },
    {
      id: 'forest',
      title: 'Forestry',
      icon: <Trees className="h-5 w-5" />,
      color: 'bg-emerald-100 text-emerald-700',
      topics: [
        'Forest Plants Identification',
        'Silviculture',
        'Agroforestry Systems',
        'Forest Conservation',
        'Medicinal Plants'
      ]
    },
    {
      id: 'general',
      title: 'General Farm Science',
      icon: <Sprout className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-700',
      topics: [
        'Weed Management',
        'Sericulture (Silkworm Rearing)',
        'Vermiculture & Composting',
        'Fisheries Science',
        'Cattle Feeds & Fodder',
        'Protected Cultivation',
        'Important Insects & Pests',
        'Pest Control Tools',
        'Apiculture (Beekeeping)',
        'Manures & Fertilizers',
        'Indian Spices',
        'Irrigation Systems'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900">Course Curriculum</h3>
        <p className="text-gray-500 mt-2">Comprehensive coverage of all practical exam topics</p>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar/Tabs */}
        <div className="w-full md:w-1/3 bg-gray-50 p-4 space-y-2 border-r border-gray-100">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setActiveTab(subject.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                activeTab === subject.id 
                  ? "bg-white shadow-md text-gray-900 border border-gray-100" 
                  : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
              )}
            >
              <div className={cn("p-2 rounded-lg", subject.color)}>
                {subject.icon}
              </div>
              <span className="font-medium">{subject.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-8 bg-white min-h-[400px]">
          {subjects.map((subject) => (
            activeTab === subject.id && (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn("p-3 rounded-2xl", subject.color)}>
                    {subject.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">{subject.title}</h4>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {subject.topics.map((topic, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors group"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary-300 group-hover:bg-primary-500 transition-colors" />
                      <span className="text-gray-700 font-medium">{topic}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;