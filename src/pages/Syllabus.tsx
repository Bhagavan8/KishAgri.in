import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp, FlaskConical, Sprout, Tractor, Leaf } from 'lucide-react';

const syllabusData = [
  {
    title: "Crop Production",
    icon: <Sprout className="h-6 w-6 text-green-600" />,
    topics: [
      "Classification of crops",
      "Tillage and tilth",
      "Seeds and sowing",
      "Nutrient management",
      "Irrigation management",
      "Weed management",
      "Cropping systems",
      "Harvesting and storage"
    ]
  },
  {
    title: "Soil Science",
    icon: <Leaf className="h-6 w-6 text-brown-600" />,
    topics: [
      "Soil formation and composition",
      "Physical properties of soil",
      "Chemical properties of soil",
      "Soil organic matter",
      "Soil pollution",
      "Soil conservation",
      "Problematic soils and management"
    ]
  },
  {
    title: "Plant Protection",
    icon: <FlaskConical className="h-6 w-6 text-purple-600" />,
    topics: [
      "Important insect pests of crops",
      "Integrated Pest Management (IPM)",
      "Plant diseases and their symptoms",
      "Principles of plant disease control",
      "Pesticides and fungicides",
      "Safety measures in pesticide application"
    ]
  },
  {
    title: "Agriculture Engineering",
    icon: <Tractor className="h-6 w-6 text-orange-600" />,
    topics: [
      "Farm implements and machinery",
      "Tillage implements",
      "Sowing and planting equipment",
      "Plant protection equipment",
      "Harvesting and threshing equipment",
      "Farm power sources",
      "Surveying and levelling"
    ]
  },
  {
    title: "Horticulture",
    icon: <Sprout className="h-6 w-6 text-pink-600" />,
    topics: [
      "Importance of horticulture",
      "Propagation methods",
      "Cultivation of fruit crops",
      "Cultivation of vegetable crops",
      "Floriculture and landscaping",
      "Post-harvest technology",
      "Medicinal and aromatic plants"
    ]
  }
];

const Syllabus = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            K-CET Agriculture Syllabus
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive practical syllabus for 2025 Agriculture quota entrance examination.
          </motion.p>
        </div>

        {/* Syllabus Accordion */}
        <div className="space-y-4">
          {syllabusData.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-50 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-left">
                    {section.title}
                  </h3>
                </div>
                {openSection === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2 bg-white border-t border-gray-100">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start space-x-2 text-gray-600">
                        <BookOpen className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-green-900 text-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">Need the complete syllabus PDF?</h3>
            <p className="text-green-100 mb-6">
              Download the detailed official syllabus with weightage and marks distribution.
            </p>
            <button className="bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center">
              Download PDF
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
