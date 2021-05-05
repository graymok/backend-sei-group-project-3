'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [
     {
        name: "Dell 3040 PC Desktop",
        description: "High end desktop with Intel’s top of the line Core i5 series processor so you can expect lightning fast, reliable and consistent performance for an exceptional PC experience.",
        image:"https://images-na.ssl-images-amazon.com/images/I/71Dqzxyb-eL._AC_SL1500_.jpg",
        price:"$495.00",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      name: "Logitech MX Master Wireless Mouse",
      description: "Logitech MX Master Wireless Mouse – High-precision Sensor, Speed-Adaptive Scroll Wheel, Easy-Switch up to 3 Devices - Meteorite Black.",
      image:"https://images-na.ssl-images-amazon.com/images/I/61QPD0mVzBL._AC_SL1500_.jpg",
      price:"$59.00",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: "Logitech MX Keys",
      description: "Logitech MX Keys Advanced Wireless Illuminated Keyboard - Graphite.",
      image:"https://images-na.ssl-images-amazon.com/images/I/415APpHcd6L._AC_.jpg",
      price:"$99.00",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: "Dell 3040 Lenovo IdeaCentre 3 Desktop",
      description: "Tower, AMD Athlon Silver 3050U Processor, AMD Radeon Graphics, 4GB DDR4, 256GB SSD, Wi-Fi 802.11, Bluetooth, HDMI, 8 USB Ports, Windows 10, 90NT0000US, Silver.",
      image:"https://images-na.ssl-images-amazon.com/images/I/614QyNf97oL._AC_SL1500_.jpg",
      price:"$350.00",
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "HP 24mh FHD Monitor",
      description: "Computer Monitor with 23.8-Inch IPS Display (1080p) - Built-In Speakers and VESA Mounting - Height/Tilt Adjustment for Ergonomic Viewing - HDMI and DisplayPort.",
      image:"https://images-na.ssl-images-amazon.com/images/I/91fAU6mxFsL._AC_SL1500_.jpg",
      price:"$220.00",
      createdAt: new Date(),
      updatedAt: new Date()
   }
    ])

  
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

