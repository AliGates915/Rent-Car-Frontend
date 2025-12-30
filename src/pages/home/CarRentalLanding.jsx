import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Car, Shield, Users, Calendar, Star, CheckCircle, Menu, X, CreditCard, MapPin, UserCheck, BarChart, Sparkles, PlayCircle, TrendingUp, Zap, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const CarRentalLanding = () => {
    const [activeTab, setActiveTab] = useState('user');
    const [menuOpen, setMenuOpen] = useState(false);
    const [bookModalOpen, setBookModalOpen] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        });
    }, [controls]);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const carList = [
        { id: 1, name: 'Tesla Model S', type: 'Luxury', price: 120, seats: 5, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 2, name: 'Toyota Camry', type: 'Sedan', price: 65, seats: 5, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 3, name: 'BMW X5', type: 'SUV', price: 95, seats: 7, image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 4, name: 'Ford Mustang', type: 'Sports', price: 150, seats: 4, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ];

    // Add these functions before your component or inside useMemo
    const getFeatureDescription = (role, index) => {
        const descriptions = {
            user: [
                "Browse and book from hundreds of verified cars",
                "Real-time tracking and notifications",
                "Secure payment processing with multiple options",
                "Easy booking management and cancellation",
                "Access to premium customer support",
                "Review and rating system"
            ],
            owner: [
                "Earn passive income from your idle vehicle",
                "Set your own pricing and availability",
                "Track earnings and performance analytics",
                "Manage bookings and schedules",
                "Secure insurance coverage included",
                "Automated payment processing"
            ],
            admin: [
                "Monitor all platform activities in real-time",
                "Manage user accounts and permissions",
                "Handle disputes and support tickets",
                "Platform analytics and reporting",
                "Content and listing moderation",
                "System configuration and settings"
            ]
        };
        return descriptions[role]?.[index] || "Premium feature included";
    };

    const getDetailedDescription = (role, index) => {
        const detailed = {
            user: [
                "Access our extensive catalog of premium vehicles with detailed filters",
                "Receive instant updates on your booking status and car location",
                "Multiple payment methods with bank-level security encryption",
                "Modify or cancel bookings up to 24 hours before pickup",
                "Dedicated support team available round the clock",
                "Share your experience and read authentic reviews"
            ],
            owner: [
                "Turn your unused car into a steady revenue stream",
                "Control rental rates based on demand and season",
                "Detailed financial reports and earnings projections",
                "Calendar-based scheduling with automatic conflict prevention",
                "Comprehensive insurance for peace of mind",
                "Instant payouts to your preferred bank account"
            ],
            admin: [
                "Real-time dashboard with all platform metrics",
                "User management with role-based access control",
                "Resolution center for handling user issues efficiently",
                "Generate custom reports and export data",
                "Quality control for all listings and user content",
                "System maintenance and performance optimization"
            ]
        };
        return detailed[role]?.[index] || "Detailed feature description";
    };

    // Also update your roleFeatures to match array lengths
    const roleFeatures = {
        user: [
            "Wide Selection of Cars",
            "Instant Booking",
            "Secure Payments",
            "Flexible Cancellation",
            "24/7 Support",
            "Verified Reviews"
        ],
        owner: [
            "Passive Income",
            "Flexible Pricing",
            "Earnings Dashboard",
            "Booking Management",
            "Insurance Coverage",
            "Automated Payments"
        ],
        admin: [
            "Platform Monitoring",
            "User Management",
            "Dispute Resolution",
            "Analytics & Reports",
            "Content Moderation",
            "System Settings"
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header/Navigation */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-2"
                        >
                            <Car className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold text-gray-800">Rent a Car</span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</a>
                            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">Features</a>
                            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition">How It Works</a>
                            <a href="#cars" className="text-gray-700 hover:text-blue-600 font-medium transition">Available Cars</a>
                            <Link to='/'>
                                <button className="text-gray-700 hover:text-blue-600 font-medium">Login</button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden mt-4 space-y-4"
                            >
                                <a href="#" className="block text-gray-700 hover:text-blue-600">Home</a>
                                <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
                                <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</a>
                                <a href="#cars" className="block text-gray-700 hover:text-blue-600">Available Cars</a>
                                <button className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                                    Book a Car
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                </div>

                <div className="container relative mx-auto px-4 py-20 md:py-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Subheading */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8"
                            >
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm font-medium">Premium Car Rental Service</span>
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="text-white">Elevate Your</span>
                                <span className="block mt-2 text-blue bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                                    Travel Experience
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                className="text-lg text-gray-300 mb-10 max-w-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Discover the freedom of premium mobility. Rent luxury, sports, and family vehicles
                                with exclusive benefits, premium service, and competitive rates.
                            </motion.p>

                            {/* Action Buttons */}
                            <motion.div
                                className="flex flex-wrap gap-4 mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Link to="/">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Start Your Journey
                                    </motion.button>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                                >
                                    <span className="flex items-center gap-2">
                                        Watch Demo
                                        <PlayCircle className="h-5 w-5" />
                                    </span>
                                </motion.button>
                            </motion.div>

                            {/* Stats Grid */}
                            <motion.div
                                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                {[
                                    { value: '10K+', label: 'Happy Customers', highlight: true },
                                    { value: '500+', label: 'Car Fleet' },
                                    { value: '24/7', label: 'Support' },
                                    { value: '50+', label: 'Locations' }
                                ].map((stat, index) => (
                                    <div key={index} className={`p-4 rounded-xl ${stat.highlight ? 'bg-white/10 backdrop-blur-sm' : ''}`}>
                                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-300">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Car Showcase */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Main Image Container */}
                            <div className="relative rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Premium Car"
                                    className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                            </div>

                            {/* Features Overlay */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="absolute -bottom-6 left-1/4 transform -translate-x-1/2 w-11/12"
                            >
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                    <div className="grid grid-cols-3 gap-6">
                                        {[
                                            { icon: '⚡', label: 'Quick Pickup', desc: '30 min or less' },
                                            { icon: '🛡️', label: 'Full Coverage', desc: 'Zero worries' },
                                            { icon: '💰', label: 'Best Price', desc: 'Guaranteed' }
                                        ].map((feature, index) => (
                                            <div key={index} className="text-center">
                                                <div className="text-2xl mb-2">{feature.icon}</div>
                                                <div className="font-semibold text-white">{feature.label}</div>
                                                <div className="text-sm text-gray-300">{feature.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Rating Badge */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -10 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-3 rounded-full shadow-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-current" />
                                    <div>
                                        <div className="font-bold">4.8/5</div>
                                        <div className="text-xs">Trustpilot</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-20 md:py-28 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white"></div>
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

                <div className="container relative mx-auto px-4">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Platform <span className="text-blue-600">Features</span> For Everyone
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Tailored experiences for renters, car owners, and administrators with powerful tools
                            designed to streamline every aspect of car rental.
                        </p>
                    </motion.div>

                    {/* Interactive Cards Section */}
                    <div className="max-w-6xl mx-auto">
                        {/* Role Selection */}
                        <div className="flex justify-center mb-12">
                            <div className="inline-flex items-center p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-2xl border border-gray-200">
                                {[
                                    { id: 'user', label: 'For Renters', icon: Users },
                                    { id: 'owner', label: 'For Car Owners', icon: DollarSign },
                                    { id: 'admin', label: 'For Administrators', icon: Shield }
                                ].map((role) => {
                                    const Icon = role.icon;
                                    return (
                                        <motion.button
                                            key={role.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveTab(role.id)}
                                            className={`relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${activeTab === role.id ? 'text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
                                        >
                                            {activeTab === role.id && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-white shadow-lg rounded-xl border border-blue-100"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <Icon className={`h-5 w-5 relative z-10 ${activeTab === role.id ? 'text-blue-600' : 'text-gray-500'}`} />
                                            <span className="relative z-10">{role.label}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Features Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="relative"
                            >
                                {/* Main Feature Card */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                    <div className="grid lg:grid-cols-2 gap-0">
                                        {/* Features List */}
                                        <div className="p-10 md:p-12">
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                                    {activeTab === 'user' && 'Renter Features'}
                                                    {activeTab === 'owner' && 'Owner Dashboard'}
                                                    {activeTab === 'admin' && 'Admin Controls'}
                                                </h3>
                                                <div className="space-y-6">
                                                    {roleFeatures[activeTab].map((feature, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 * index }}
                                                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
                                                        >
                                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900 mb-1">{feature}</div>
                                                                <div className="text-sm text-gray-600">
                                                                    {getFeatureDescription(activeTab, index)}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Visual Dashboard */}
                                        <div className="relative p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-l border-gray-100">
                                            <div className="relative h-full min-h-[400px]">
                                                {/* Mock Dashboard */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="absolute inset-0 m-4 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                                                >
                                                    {/* Dashboard Header */}
                                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-white">
                                                                <h4 className="text-xl font-bold">
                                                                    {activeTab === 'user' && 'Renter Dashboard'}
                                                                    {activeTab === 'owner' && 'Owner Portal'}
                                                                    {activeTab === 'admin' && 'Admin Console'}
                                                                </h4>
                                                                <p className="text-blue-100 text-sm">Real-time insights & controls</p>
                                                            </div>
                                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                                {activeTab === 'user' && <Users className="h-6 w-6 text-white" />}
                                                                {activeTab === 'owner' && <DollarSign className="h-6 w-6 text-white" />}
                                                                {activeTab === 'admin' && <Shield className="h-6 w-6 text-white" />}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Dashboard Content */}
                                                    <div className="p-6">
                                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                                            {[
                                                                { label: 'Active Bookings', value: '12', color: 'green' },
                                                                { label: 'Total Revenue', value: '$4,820', color: 'blue' },
                                                                { label: 'Cars Listed', value: '8', color: 'purple' },
                                                                { label: 'Rating', value: '4.8★', color: 'yellow' }
                                                            ].map((stat, index) => (
                                                                <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                                                                    <div className={`text-2xl font-bold text-gray-900 mb-1`}>
                                                                        {stat.value}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Feature Highlights */}
                                                        <div className="space-y-3">
                                                            {roleFeatures[activeTab].slice(0, 3).map((feature, index) => (
                                                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                                    <span className="text-sm text-gray-700 truncate">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Floating Elements */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                    className="absolute -right-4 -bottom-4"
                                                >
                                                    <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-200 max-w-xs">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                                <Zap className="h-5 w-5 text-green-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">Live Updates</div>
                                                                <div className="text-sm text-gray-600">Real-time notifications</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Bar */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {[
                                        {
                                            value: activeTab === 'user' ? '10K+' : activeTab === 'owner' ? '2K+' : '50+',
                                            label: activeTab === 'user' ? 'Active Renters' : activeTab === 'owner' ? 'Car Owners' : 'Platform Admins',
                                            icon: Users
                                        },
                                        {
                                            value: activeTab === 'user' ? '98%' : activeTab === 'owner' ? '85%' : '99.9%',
                                            label: activeTab === 'user' ? 'Satisfaction Rate' : activeTab === 'owner' ? 'Owner Earnings' : 'Uptime',
                                            icon: TrendingUp
                                        },
                                        {
                                            value: activeTab === 'user' ? '4.8★' : activeTab === 'owner' ? '24/7' : '100%',
                                            label: activeTab === 'user' ? 'Average Rating' : activeTab === 'owner' ? 'Support' : 'Security',
                                            icon: Shield
                                        }
                                    ].map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                        <Icon className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                                        <div className="text-gray-600">{stat.label}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Available Cars Section */}
            <section id="cars" className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Premium <span className="text-blue-600">Fleet</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Experience luxury and performance with our meticulously maintained vehicles
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {carList.map((car, index) => (
                            <motion.div
                                key={car.id}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            >
                                {/* Premium Badge */}
                                {car.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            PREMIUM
                                        </span>
                                    </div>
                                )}

                                {/* Car Image with Gradient Overlay */}
                                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                    {/* Quick Info Overlay */}
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <span className="text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                            {car.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Car Details */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {car.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1">{car.brand}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${car.type === 'SUV' ? 'bg-green-100 text-green-800' :
                                            car.type === 'Sedan' ? 'bg-blue-100 text-blue-800' :
                                                car.type === 'Sports' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {car.type}
                                        </span>
                                    </div>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                                        <div className="text-center">
                                            <Users className="h-5 w-5 mx-auto text-gray-400 mb-1" />
                                            <span className="text-sm text-gray-600">{car.seats} Seats</span>
                                        </div>
                                        <div className="text-center">
                                            <svg className="h-5 w-5 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{car.transmission || 'Auto'}</span>
                                        </div>
                                        <div className="text-center">
                                            <svg className="h-5 w-5 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{car.fuel || 'Petrol'}</span>
                                        </div>
                                    </div>

                                    {/* Price and Booking */}
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-baseline">
                                                <span className="text-3xl font-bold text-gray-900">${car.price}</span>
                                                <span className="text-gray-500 ml-1">/day</span>
                                            </div>
                                            {car.originalPrice && (
                                                <p className="text-sm text-gray-400 line-through">${car.originalPrice}</p>
                                            )}
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative overflow-hidden group bg-gradient-to-r from-gray-100/50 to-gray-200/50 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                        >
                                            <span className="relative z-10 flex items-center">
                                                Book Now
                                                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </motion.button>
                                    </div>

                                    {/* Availability Badge */}
                                    <div className="mt-4 flex items-center">
                                        <div className={`h-2 w-2 rounded-full mr-2 ${car.available ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className="text-sm text-gray-600">
                                            {car.available ? 'Available now' : 'Unavailable'}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-2xl pointer-events-none transition-all duration-500" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* View All Button */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                            View All Vehicles →
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Your Journey, <span className="text-blue bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Simplified</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Experience seamless car rental in three simple steps. From selection to ignition, we have streamlined everything.
                        </p>
                    </motion.div>

                    <div className="relative max-w-6xl mx-auto">
                        {/* Connecting Line for Steps */}
                        <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20 z-0" />

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10"
                        >
                            {[
                                {
                                    step: 1,
                                    title: 'Browse & Select',
                                    desc: 'Explore our premium fleet with detailed specifications, 360° views, and verified condition reports.',
                                    icon: <Car className="h-8 w-8" />,
                                    color: 'from-green-500 to-green-600',
                                    features: ['Live availability', 'Compare options', 'Virtual tour']
                                },
                                {
                                    step: 2,
                                    title: 'Secure Booking',
                                    desc: 'Instant confirmation with flexible payment options and transparent pricing. No hidden fees.',
                                    icon: <CreditCard className="h-8 w-8" />,
                                    color: 'from-green-500 to-green-600',
                                    features: ['Instant booking', 'Multiple payments', 'Price match']
                                },
                                {
                                    step: 3,
                                    title: 'Drive Away',
                                    desc: 'Contactless pickup, digital key handover, and 24/7 roadside assistance for peace of mind.',
                                    icon: <MapPin className="h-8 w-8" />,
                                    color: 'from-purple-500 to-purple-600',
                                    features: ['Contactless pickup', 'Digital key', '24/7 support']
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="relative group"
                                >
                                    {/* Step Number Circle with Gradient */}
                                    <div className="relative z-10 mb-8">
                                        <div className={`h-20 w-20 border border-purple-600 text-gray-500 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg shadow-${item.color.split(' ')[1].replace('to-', '')}/20 mx-auto flex items-center justify-center relative overflow-hidden`}>
                                            {/* Animated Background Pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute top-0 left-0 w-12 h-12 border-2 border-purple-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
                                                <div className="absolute bottom-0 right-0 w-12 h-12 border-2 border-purple-600 rounded-full translate-x-1/2 translate-y-1/2" />
                                            </div>

                                            {/* Icon Container */}
                                            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                                                <div className="text-border-purple-600">
                                                    {item.icon}
                                                </div>
                                            </div>

                                            {/* Step Number Badge */}
                                            <div className="absolute -top-2 -right-2 bg-white border-2 border-gray-100 text-gray-900 font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
                                                {item.step}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative">
                                        {/* Hover Effect Glow - Fixed with explicit colors */}
                                        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                            index === 1 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                                                'bg-gradient-to-br from-purple-500 to-purple-600'
                                            }`} />

                                        <div className="relative">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 mb-6 leading-relaxed">
                                                {item.desc}
                                            </p>

                                            {/* Features List - Fixed icon colors */}
                                            <div className="space-y-3 mb-8">
                                                {item.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center text-sm text-gray-700">
                                                        <svg className={`h-5 w-5 mr-3 flex-shrink-0 ${index === 0 ? 'text-blue-600' :
                                                            index === 1 ? 'text-green-600' :
                                                                'text-purple-600'
                                                            }`} fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA Button - Fixed gradient */}
                                            <button className={`w-full border border-purple-600 shadow-lg py-3 text-blue rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group/btn ${index === 0 ? 'bg-white hover:bg-purple-600 hover:text-white' :
                                                index === 1 ? 'bg-white hover:bg-purple-600 hover:text-white' :
                                                    'bg-gradient-to-r from-purple-600 to-purple-500 hover:text-white text-white'
                                                }`}>
                                                <span>Learn More</span>
                                                <svg className="h-5 w-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Decorative Corner - Fixed border colors */}
                                        <div className={`absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 rounded-tr-2xl ${index === 0 ? 'border-blue-600' :
                                            index === 1 ? 'border-green-600' :
                                                'border-purple-600'
                                            }`} />
                                    </div>

                                    {/* Connector for Mobile */}
                                    {index < 2 && (
                                        <div className="md:hidden absolute top-0 right-0 h-full w-8 flex items-center justify-center">
                                            <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-blue-500/40" />
                                            <svg className="absolute right-0 text-blue-500/40 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Bottom CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-20 text-center"
                    >
                    </motion.div>
                </div>
            </section>

            {/* Booking Modal */}
            <AnimatePresence>
                {bookModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={() => setBookModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Book Your Car</h3>
                                <button
                                    onClick={() => setBookModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X />
                                </button>
                            </div>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Select Car</label>
                                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                                            <option>Tesla Model S - $120/day</option>
                                            <option>Toyota Camry - $65/day</option>
                                            <option>BMW X5 - $95/day</option>
                                            <option>Ford Mustang - $150/day</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Pickup Location</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter location" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Pickup Date</label>
                                        <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Return Date</label>
                                        <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="driver" className="h-5 w-5" />
                                    <label htmlFor="driver" className="text-gray-700">Include Professional Driver</label>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Rental Fee (3 days)</span>
                                        <span className="font-semibold">$360</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Service Fee</span>
                                        <span className="font-semibold">$25</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Insurance</span>
                                        <span className="font-semibold">$45</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>$430</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
                                >
                                    Confirm Booking
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Car className="h-8 w-8" />
                                <span className="text-2xl font-bold">Rent a Car</span>
                            </div>
                            <p className="text-gray-400">
                                Your trusted car rental platform connecting owners with renters.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                                <li><a href="#cars" className="text-gray-400 hover:text-white transition">Available Cars</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">List Your Car</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-4">Roles</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">User Dashboard</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Owner Portal</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Admin Panel</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>support@rentacar.com</li>
                                <li>+1 (555) 123-4567</li>
                                <li>24/7 Customer Support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2026 Rent a Car. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CarRentalLanding;