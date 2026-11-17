import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiMaximize2, FiCalendar, FiTrendingUp, FiUsers, FiDollarSign, FiGrid } from 'react-icons/fi';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaLinkedin, FaEthereum } from 'react-icons/fa';
import { fetchProperty } from '../api';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [status, setStatus] = useState('loading');
  const [amount, setAmount] = useState(100);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    fetchProperty(id)
      .then((data) => {
        if (!active) return;
        setProperty(data);
        setStatus(data ? 'ready' : 'missing');
      })
      .catch(() => {
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (status === 'loading') {
    return <div className="container py-24 text-center text-secondary-600">Loading listing…</div>;
  }

  if (status !== 'ready' || !property) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Listing unavailable</h1>
        <Link to="/properties" className="btn">Back to properties</Link>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="container py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-secondary-600 hover:text-primary-600">Home</Link>
            <span className="text-secondary-400">/</span>
            <Link to="/properties" className="text-secondary-600 hover:text-primary-600">Properties</Link>
            <span className="text-secondary-400">/</span>
            <span className="text-primary-600">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="h-96 rounded-lg overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {property.images.slice(1).map((image, index) => (
                  <div key={index} className="h-32 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${property.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Property Details</h2>
              <p className="text-secondary-600 mb-6">{property.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  {/* <FiBed className="text-primary-600" /> */}
                  <span>{property.parkingSpaces} Parking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMaximize2 className="text-primary-600" />
                  <span>{property.lotSize}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCalendar className="text-primary-600" />
                  <span>Built {property.yearBuilt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiUsers className="text-primary-600" />
                  <span>{property.metrics.totalInvestors} Investors</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FiHome className="text-primary-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Token Details */}
              <h3 className="text-xl font-semibold mb-4">Token Information</h3>
              <div className="bg-secondary-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-600">Token Symbol</p>
                    <p className="font-semibold">{property.tokenDetails.tokenSymbol}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">Token Price</p>
                    <p className="font-semibold">{property.tokenDetails.tokenPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">Available Tokens</p>
                    <p className="font-semibold">{property.tokenDetails.availableTokens.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">Total Supply</p>
                    <p className="font-semibold">{property.tokenDetails.totalTokens.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-secondary-600">Smart Contract</p>
                    <p className="font-mono text-sm">{property.tokenDetails.contractAddress}</p>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Rental Income</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Gross Rent</span>
                      <span className="font-medium">{property.financials.grossRent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Net Rent</span>
                      <span className="font-medium">{property.financials.netRent}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Expenses</h4>
                  <div className="space-y-2">
                    {Object.entries(property.financials.expenses).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-secondary-600">{key.replace('_', ' ').charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Investment Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-secondary-500">Investment Price</p>
                  <div className="flex items-center">
                    <FiDollarSign className="text-primary-600" />
                    <span className="text-2xl font-bold">${property.price.usd.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-primary-600">
                    <FaEthereum className="mr-1" />
                    <span>{property.price.eth} ETH</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-secondary-500">Annual ROI</p>
                  <div className="flex items-center justify-end text-green-600">
                    <FiTrendingUp className="mr-1" />
                    <span className="text-2xl font-bold">{property.roi}</span>
                  </div>
                </div>
              </div>

              {/* Investment Metrics */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Rental Yield</span>
                  <span className="font-medium">{property.metrics.rentalYield}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Appreciation</span>
                  <span className="font-medium">{property.metrics.appreciation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Total Return</span>
                  <span className="font-medium text-green-600">{property.metrics.totalReturn}</span>
                </div>
              </div>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary-600">Funding Progress</span>
                  <span className="font-medium">{property.metrics.funded}</span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: property.metrics.funded }}
                  />
                </div>
                <p className="text-sm text-secondary-500 mt-1">
                  Min Investment: {property.metrics.minInvestment}
                </p>
              </div>
              
              <Link
                to={`/property-3d`}
                className="btn w-full mb-4 flex items-center justify-center">
                <FiGrid className="mr-2" />
                View 3D version
              </Link>

              <div className="mb-6 rounded-lg bg-secondary-50 p-4">
                <h3 className="font-semibold mb-2">If you invest</h3>
                <label className="text-sm text-secondary-600" htmlFor="invest-amount">Amount in USD</label>
                <input
                  id="invest-amount"
                  type="number"
                  min="10"
                  className="input mt-1"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value) || 0)}
                />
                <p className="mt-3 text-sm text-secondary-700">
                  ${Number(amount).toLocaleString()} at {property.metrics.rentalYield} rental yield is about{' '}
                  <span className="font-semibold">
                    ${((Number(amount) * (parseFloat(property.metrics.rentalYield) / 100)) / 12).toFixed(2)}
                  </span>
                  {' '}a month. This is an estimate, not a payment.
                </p>
              </div>
              <p className="mb-4 rounded-md bg-secondary-50 px-3 py-2 text-center text-sm text-secondary-600">
                Wallet connection is not available yet. Review the return first.
              </p>
              
              <div className="flex items-center justify-center space-x-4 pt-4 border-t">
                <FacebookShareButton url={shareUrl}>
                  <FaFacebook className="text-2xl text-blue-600 hover:opacity-80" />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <FaTwitter className="text-2xl text-sky-500 hover:opacity-80" />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <FaLinkedin className="text-2xl text-blue-700 hover:opacity-80" />
                </LinkedinShareButton>
              </div>
            </div>

            {/* Agent Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{property.agent.name}</h3>
                  <p className="text-sm text-secondary-600">Investment Advisor</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {property.agent.phone}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {property.agent.email}
                </p>
              </div>
              <button className="btn-secondary w-full mt-4">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;