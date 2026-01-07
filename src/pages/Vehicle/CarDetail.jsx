// CarDetail.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Car, Users, Calendar, Star, MapPin, Shield, Fuel, Settings, Plus, X } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa';

const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState('3');
    const [selectedCity, setSelectedCity] = useState('');
    const [customCity, setCustomCity] = useState('');
    const [customDays, setCustomDays] = useState('');
    const [showCustomCity, setShowCustomCity] = useState(false);
    const [packagePrices, setPackagePrices] = useState({
        '3': 1000,
        '5': 5000,
        '10': 9000,
        '14': 12000
    });

    const carList = [
        {
            id: 1, name: 'Tesla Model S', type: 'Luxury', price: 120, seats: 5,
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Experience the future of driving with the Tesla Model S. This all-electric luxury sedan offers exhilarating performance, cutting-edge technology, and zero emissions.',
            features: ['Autopilot', 'Panoramic Roof', 'Premium Audio', 'Wireless Charging'],
            specifications: {
                engine: 'Electric',
                horsepower: '670 HP',
                acceleration: '0-60 mph in 2.3s',
                range: '405 miles',
                transmission: 'Automatic'
            }
        },
        {
            id: 2, name: 'Toyota Camry', type: 'Sedan', price: 65, seats: 5,
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Reliable and comfortable, the Toyota Camry is perfect for family trips and daily commutes.',
            features: ['Bluetooth', 'Backup Camera', 'Cruise Control', 'Lane Assist'],
            specifications: {
                engine: '2.5L 4-Cylinder',
                horsepower: '203 HP',
                acceleration: '0-60 mph in 7.9s',
                fuelEfficiency: '32 MPG Combined',
                transmission: '8-Speed Automatic'
            }
        },
        {
            id: 3, name: 'BMW X5', type: 'SUV', price: 95, seats: 7,
            image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'The BMW X5 combines luxury, performance, and versatility in one sophisticated package.',
            features: ['Heated Seats', 'Navigation', 'Parking Assistant', 'Premium Package'],
            specifications: {
                engine: '3.0L Turbo I6',
                horsepower: '335 HP',
                acceleration: '0-60 mph in 5.3s',
                fuelEfficiency: '23 MPG Combined',
                transmission: '8-Speed Automatic'
            }
        },
        {
            id: 4, name: 'Ford Mustang', type: 'Sports', price: 150, seats: 4,
            image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Iconic American muscle car with powerful performance and head-turning style.',
            features: ['Sport Mode', 'Premium Sound', 'Performance Package', 'Convertible Top'],
            specifications: {
                engine: '5.0L V8',
                horsepower: '450 HP',
                acceleration: '0-60 mph in 4.3s',
                fuelEfficiency: '19 MPG Combined',
                transmission: '10-Speed Automatic'
            }
        },
    ];

    const cities = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Houston', 'Phoenix'];
    const packages = ['3', '5', '10', '14', 'custom'];

    useEffect(() => {
        // Check if user is logged in (you should implement actual auth check)
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const foundCar = carList.find(car => car.id === parseInt(id));
        if (foundCar) {
            setCar(foundCar);
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    const calculateCustomPrice = () => {
        if (!customDays || customDays < 1) return 0;
        const dailyRate = car.price;
        const baseDays = Object.keys(packagePrices);
        const basePrice = packagePrices[baseDays[baseDays.length - 1]];

        if (customDays <= 14) {
            // Use existing package prices for up to 14 days
            for (const pkg of ['3', '5', '10', '14']) {
                if (customDays <= parseInt(pkg)) {
                    return packagePrices[pkg];
                }
            }
        } else {
            // Calculate custom price for more than 14 days
            const extraDays = customDays - 14;
            return basePrice + (extraDays * dailyRate * 0.9); // 10% discount for extended rental
        }
        return 0;
    };

    const handleBookRequest = () => {
        // Determine which city to use
        const finalCity = showCustomCity ? customCity : selectedCity;

        if (!finalCity || finalCity.trim() === '') {
            alert('Please select or enter a city');
            return;
        }

        if (selectedPackage === 'custom' && (!customDays || customDays < 1)) {
            alert('Please enter number of days for custom package');
            return;
        }

        const days = selectedPackage === 'custom' ? customDays : selectedPackage;
        const price = selectedPackage === 'custom' ? calculateCustomPrice() : packagePrices[selectedPackage];

        alert(`Booking request sent!\nCar: ${car.name}\nCity: ${finalCity}\nPackage: ${days} days\nTotal Price: $${price}`);
    };

    const handleCustomCityToggle = () => {
        setShowCustomCity(!showCustomCity);
        // Only clear selectedCity when switching TO custom city mode
        if (!showCustomCity) {
            setSelectedCity(''); // Clear selected city when switching to custom
            setCustomCity(''); // Also clear custom city input
        }
        // When switching FROM custom city mode, selectedCity will already be empty
        // so no need to clear it again
    };

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
            <div className=" mx-auto px-4">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex gap-3 items-center"
                >
                    <FaArrowLeft/> Back to Cars
                </motion.button>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="grid lg:grid-cols-2 gap-8 p-8">
                        {/* Left Side - Car Image */}
                        <div className="space-y-4">
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Additional Images */}
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                                        <img
                                            src={car.image}
                                            alt={`${car.name} view ${num}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Car Details */}
                        <div className="space-y-6">
                            {/* Car Title */}
                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
                                        <p className="text-gray-600 mt-1">{car.type}</p>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-600">${car.price}<span className="text-lg text-gray-500">/day</span></span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mt-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-gray-600">4.8 (128 reviews)</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Description</h2>
                                <p className="text-gray-700 leading-relaxed">{car.description}</p>
                            </div>

                            {/* Specifications */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Seats</p>
                                            <p className="font-semibold">{car.seats} People</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Settings className="h-5 w-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Engine</p>
                                            <p className="font-semibold">{car.specifications.engine}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Fuel className="h-5 w-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Fuel</p>
                                            <p className="font-semibold">{car.specifications.fuelEfficiency}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Shield className="h-5 w-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Safety</p>
                                            <p className="font-semibold">5-Star Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Features</h2>
                                <div className="flex flex-wrap gap-2">
                                    {car.features.map((feature, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Booking Section */}
                            <div className="border-t pt-6">
                                <h2 className="text-2xl font-bold mb-6">Book This Car</h2>

                                {/* City Selection */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-lg font-semibold">Select City</h3>
                                        <button
                                            type="button"
                                            onClick={handleCustomCityToggle}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${showCustomCity
                                                ? 'bg-green-100 text-green-700 border border-green-300'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {showCustomCity ? (
                                                <>
                                                    <X className="h-3 w-3" />
                                                    Select from List
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="h-3 w-3" />
                                                    Enter Custom City
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {showCustomCity ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-gray-700 mb-2">Enter Custom City</label>
                                                <input
                                                    type="text"
                                                    value={customCity}
                                                    onChange={(e) => setCustomCity(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                                    placeholder="Enter your city name"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {cities.map((city) => (
                                                <button
                                                    key={city}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCity(city);
                                                        // Also clear custom city when selecting from list
                                                        setCustomCity('');
                                                    }}
                                                    className={`p-3 rounded-lg border-2 text-center transition-all ${selectedCity === city
                                                        ? 'border-green bg-green-50 text-green-700 shadow-sm'
                                                        : 'border-gray-200 hover:border-green hover:bg-green-50'
                                                        }`}
                                                >
                                                    <MapPin className="h-4 w-4 inline mr-2" />
                                                    {city}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Package Selection */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">Select Package</h3>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {packages.map((pkg) => (
                                            <button
                                                key={pkg}
                                                type="button"
                                                onClick={() => setSelectedPackage(pkg)}
                                                className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedPackage === pkg
                                                    ? 'bg-green text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}

                                            >
                                                {pkg === 'custom' ? 'Custom Days' : `${pkg} Days`}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Package Price Display */}
                                    {selectedPackage !== 'custom' ? (
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <p className="text-lg font-semibold text-blue-700">
                                                {selectedPackage} Days Package: ${packagePrices[selectedPackage]}
                                            </p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                ${(packagePrices[selectedPackage] / parseInt(selectedPackage)).toFixed(0)} per day
                                            </p>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-gray-700 mb-2 font-medium">
                                                            Enter Number of Days
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={customDays}
                                                            onChange={(e) => setCustomDays(e.target.value)}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                                                            placeholder="Enter number of days"
                                                        />
                                                        <p className="text-gray-500 text-sm mt-2">
                                                            Note: Days over 14 get 10% discount on daily rate
                                                        </p>
                                                    </div>
                                                    {customDays && customDays > 0 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200"
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <p className="text-lg font-semibold text-green-700">
                                                                        Custom Package ({customDays} days)
                                                                    </p>
                                                                    {parseInt(customDays) > 14 ? (
                                                                        <p className="text-green-600 text-sm">
                                                                            Extended rental discount applied!
                                                                        </p>
                                                                    ) : (
                                                                        <p className="text-green-600 text-sm">
                                                                            Standard package rate
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-2xl font-bold text-green-700">
                                                                        ${calculateCustomPrice()}
                                                                    </p>
                                                                    <p className="text-green-600 text-sm">
                                                                        Total Amount
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {parseInt(customDays) > 14 && (
                                                                <div className="mt-3 p-2 bg-green-100 rounded-lg">
                                                                    <p className="text-green-800 text-xs">
                                                                        <span className="font-semibold">Discount:</span> 10% off daily rate for days over 14
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Book Now Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleBookRequest}
                                    disabled={!selectedCity && !(showCustomCity && customCity)}
                                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${(!selectedCity && !(showCustomCity && customCity)) ||
                                            (selectedPackage === 'custom' && !customDays)
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-green hover:to-green-600 shadow-lg hover:shadow-xl'
                                        } text-white`}

                                >
                                    Send Booking Request
                                </motion.button>

                                <p className="text-center text-gray-500 text-sm mt-4">
                                    You&apos;ll receive a confirmation call within 30 minutes
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

              
            </div>
        </div>
    );
};

export default CarDetail;