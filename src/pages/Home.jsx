import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiUser, FiClock } from 'react-icons/fi';
import { FaWallet, FaStore, FaMoneyBillWave, FaExchangeAlt, FaChartLine, FaLock, FaUserCog, FaCoins } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { fetchProperties } from '../api';

function Home() {
  const [openSections, setOpenSections] = useState({});
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [propertiesError, setPropertiesError] = useState('');

  useEffect(() => {
    let active = true;
    fetchProperties()
      .then((data) => {
        if (active) setFeaturedProperties(data.slice(0, 3));
      })
      .catch(() => {
        if (active) setPropertiesError('Listings are unavailable right now.');
      });
    return () => {
      active = false;
    };
  }, []);

  const advantages = [
    {
      icon: FaChartLine,
      title: 'Profitability',
      description: 'Target average annual returns of 7% through strategic property investments and efficient management.'
    },
    {
      icon: FaExchangeAlt,
      title: 'Liquidity',
      description: 'Trade your property NFTs anytime on our marketplace, providing unprecedented real estate liquidity.'
    },
    {
      icon: FaLock,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no entry, exit, or capital gains fees. What you see is what you get.'
    },
    {
      icon: FaUserCog,
      title: 'Hassle-Free Management',
      description: 'RentSphere handles all property management aspects, from maintenance to tenant relations.'
    }
  ];

  const investmentSteps = [
    {
      icon: FaWallet,
      title: 'Browse a listing',
      description: 'Open a property and read the yield, funding, and location before any wallet step.'
    },
    {
      icon: FaStore,
      title: 'Estimate the return',
      description: 'Enter an amount on the property page and see the monthly rental estimate.'
    },
    {
      icon: FaMoneyBillWave,
      title: 'Wallet comes last',
      description: 'Wallet connection is not deployed yet. It stays after you understand the listing.'
    },
    {
      icon: FaExchangeAlt,
      title: 'Keep or exit later',
      description: 'The demo explains holding for income or leaving a position. Settlement is not live.'
    }
  ];

  const howItWorks = [
    {
      icon: FaCoins,
      title: 'Tokenization',
      description: 'Properties are divided into $10 NFT tokens, making real estate investment accessible to everyone.'
    },
    {
      icon: SiEthereum,
      title: 'Purchase NFTs',
      description: 'Buy property NFTs using cryptocurrency, becoming a fractional owner of the property.'
    },
    {
      icon: FaMoneyBillWave,
      title: 'Monthly Returns',
      description: 'Receive your share of rental income directly to your wallet each month.'
    },
    {
      icon: FaExchangeAlt,
      title: 'Flexible Trading',
      description: 'Hold for passive income or sell your NFTs on our marketplace at any time.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'crypto', name: 'Cryptocurrency' },
    { id: 'investment', name: 'Investment' },
    { id: 'property', name: 'Property' },
    { id: 'technology', name: 'Technology' },
    { id: 'market', name: 'Market Analysis' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology',
      slug: 'future-real-estate-crypto-payments',
      excerpt: 'Explore how cryptocurrency and blockchain are revolutionizing property transactions and investment opportunities.',
      image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80',
      category: 'crypto',
      author: 'Sarah Johnson',
      date: '2024-03-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Understanding Tokenized Real Estate Investment',
      slug: 'understanding-tokenized-real-estate',
      excerpt: "A comprehensive guide to property tokenization and how it's making real estate investment more accessible.",
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80',
      category: 'investment',
      author: 'Michael Chen',
      date: '2024-03-12',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Smart Contracts in Real Estate Transactions',
      slug: 'smart-contracts-real-estate',
      excerpt: 'How smart contracts are streamlining property transactions and reducing costs.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      category: 'technology',
      author: 'David Rodriguez',
      date: '2024-03-10',
      readTime: '6 min read'
    }
  ];

  const faqSections = [
    {
      title: 'General Information',
      questions: [
        {
          question: "What is RentSphere?",
          answer: "RentSphere is an innovative investment project dedicated to real estate. We allow clients to invest as little as $10 in investment properties, with the aim of building up regular income and/or savings."
        },
        {
          question: "I want to buy NFTs, what payment methods are accepted?",
          answer: "You can use various payment methods such as Metamask, Phantom wallet, OKX wallet, Trust wallet, etc."
        },
        {
          question: "What is the marketplace, or secondary market?",
          answer: "The RentSphere Marketplace is our platform that allows RentSphere community members to buy and sell NFTs among themselves.  It is the equivalent of a secondary market where investors can buy and sell NFTs among themselves. We may also cooperate with other marketplaces to allow anyone to choose their preferred marketplace."
        },
        {
          question: "I sell or buy NFTs during the month. Who receives the rental income for the current month?",
          answer: "The rental income is paid to the investor who owns the NFTs on the day the royalties are paid."
        },
        {
          question: "Are transactions on the platform secure?",
          answer: "RentSphere uses the most advanced technical means to ensure the confidentiality and security of transactions on the platform. "
        }
      ]
    }
  ];

  const toggleSection = (sectionTitle, questionIndex) => {
    setOpenSections(prev => ({
      ...prev,
      [`${sectionTitle}-${questionIndex}`]: !prev[`${sectionTitle}-${questionIndex}`]
    }));
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="hero-stage relative min-h-[680px] flex items-center overflow-hidden">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
        <div className="hero-sheen" />
        <div className="hero-grain" />
        <div className="hero-copy relative container py-20">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-200">
              RentSphere
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Rental property, opened up from $10.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">
              Compare rental yield before you commit. Three live demo listings, from $10. Wallet connection comes later, after you choose a property.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/properties" className="hero-btn btn">
                Start investing
                <FiArrowRight className="ml-2" />
              </Link>
              <a href="#featured" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20">
                See featured properties
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-slate-300">Live listings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">434</p>
                <p className="text-slate-300">Demo investors</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">$10</p>
                <p className="text-slate-300">Minimum</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Link to="/properties" className="btn fixed bottom-4 left-4 right-4 z-40 justify-center shadow-lg md:hidden">
        Browse properties
      </Link>
      {/* Featured Properties */}
      <section id="featured" className="container">
        <div className="text-center mb-12 dark:text-white">
          <h2 className="text-3xl font-bold mb-4">Featured Investment Opportunities</h2>
          <p className="text-secondary-600 dark:text-white">Curated properties with verified returns and immediate tokenization</p>
        </div>
        
        {propertiesError && (
          <p className="mb-6 text-center text-red-600">{propertiesError}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 dark:text-white">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              className="card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-primary-600 font-semibold">
                  {property.status}
                </div>
              </div>
              <div className="p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-600">{property.type} · {property.risk} risk</p>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{property.title}</h3>
                <p className="text-secondary-600 mb-4 dark:text-white">{property.location}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-white">Price</p>
                    <p className="font-semibold">${property.price.usd.toLocaleString()}</p>
                    <p className="text-sm text-primary-600">{property.price.eth} ETH</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-500 dark:text-white">ROI</p>
                    <p className="font-semibold text-green-600">{property.roi}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600 dark:text-white">Total Investors</span>
                    <span className="font-medium dark:text-white">{property.metrics.totalInvestors}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600 dark:text-white">Funded</span>
                    <span className="font-medium dark:text-white">{property.metrics.funded}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600 dark:text-white">Min Investment</span>
                    <span className="font-medium dark:text-white">{property.metrics.minInvestment}</span>
                  </div>
                </div>

                <Link
                  to={`/properties/${property.id}`}
                  className="btn w-full flex items-center justify-center"
                >
                  View returns
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Investment Steps */}
      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Start Investing in Minutes</h2>
          <p className="text-secondary-600 dark:text-white">Your journey to crypto-powered real estate investment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {investmentSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md text-center dark:text-white dark:bg-secondary-700">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-2xl text-primary-600" />
                </div>
                <div className="text-primary-600 text-2xl font-bold mb-4">Step {index + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How RentSphere Works</h2>
            <p className="text-secondary-300">Understanding our tokenized real estate platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                className="bg-secondary-800 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <p className="text-secondary-300 dark:text-secondary-400 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary-50 dark:bg-secondary-900 pt-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Why Choose RentSphere</h2>
            <p className="text-secondary-600 dark:text-white">Experience the future of real estate investment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-secondary-700 p-6 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <advantage.icon className="text-4xl text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{advantage.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container">
        <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors already earning passive income through tokenized real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="btn bg-white text-primary-600 hover:bg-primary-50"
            >
              Browse Properties
            </Link>
            <span className="btn bg-primary-800/80 cursor-default">
              <FaWallet className="mr-2" />
              Wallet coming soon
            </span>
          </div>
        </div>
      </section>
      
      {/* Blog */}
      <div className="container bg-white dark:bg-secondary-700 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12 dark:text-white"
        >
          <h1 className="text-3xl font-bold mb-4">Latest Insights</h1>
          <p className="text-secondary-600 dark:text-white">
            Stay informed with our latest articles and market analysis
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-secondary-900 rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                    {categories.find(c => c.id === post.category)?.name}
                  </div>
                </div>
                <div className="p-6 dark:text-white">
                  <h2 className="text-xl font-semibold mb-3 hover:text-primary-600  transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-secondary-600 mb-4 dark:text-secondary-400">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-secondary-500">
                    <FiUser className="mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <FiClock className="mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      {/* FAQ Preview */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-secondary-600 dark:text-white">Find answers to common questions about our platform, cryptocurrency payments, and real estate investment.</p>
          </div>
          <div className="space-y-8">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white dark:bg-secondary-700 rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-secondary-100 dark:divide-secondary-900">
                  {section.questions.map((item, questionIndex) => (
                    <div key={questionIndex} className="p-6">
                      <button
                        className="w-full flex justify-between items-center text-left"
                        onClick={() => toggleSection(section.title, questionIndex)}
                      >
                        <span className="font-medium dark:text-white">{item.question}</span>
                        {openSections[`${section.title}-${questionIndex}`] ? (
                          <FiChevronUp className="flex-shrink-0 ml-4 dark:text-white" />
                        ) : (
                          <FiChevronDown className="flex-shrink-0 ml-4 dark:text-white" />
                        )}
                      </button>
                      <AnimatePresence>
                        {openSections[`${section.title}-${questionIndex}`] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-secondary-600 dark:text-secondary-400">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Discord CTA */}
      <section className="py-12 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Join Our Community
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Connect with other crypto real estate investors, share insights, and get early access to new properties.
              </p>
              <dl className="mt-8 space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-700 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-white">
                      10,000+ Members
                    </dt>
                    <dd className="mt-2 text-base text-primary-100">
                      Join a growing community of crypto-savvy real estate investors
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-700 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-white">
                      Weekly Events
                    </dt>
                    <dd className="mt-2 text-base text-primary-100">
                      Educational webinars, market updates, and networking sessions
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Join Discord
                </h3>
                <p className="text-gray-500 text-center mb-8">
                  Get instant access to our community and start connecting with other investors
                </p>
                <a
                  href="https://discord.gg/RentSphere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Join Now
                </a>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Already a member?{' '}
                  <a href="https://discord.gg/RentSphere" className="text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;