// ================== PRICING CALCULATOR ==================
// This script handles pricing calculations with verbose logging

console.log("[PRICING CALCULATOR] Script loaded successfully");

// Price database for products
const pricingData = {
    glasses: {
        'black-style': {
            name: 'Stijlvolle zwarte bril',
            basePrice: 99.00,
            currency: 'EUR'
        },
        'round-modern': {
            name: 'Moderne ronde bril',
            basePrice: 129.00,
            currency: 'EUR'
        },
        'aviator-trendy': {
            name: 'Trendy aviator bril',
            basePrice: 149.00,
            currency: 'EUR'
        }
    },
    discounts: {
        student: 0.10,      // 10% discount
        senior: 0.15,       // 15% discount
        loyalty: 0.05,      // 5% discount
        bulk: 0.12          // 12% discount for multiple items
    },
    taxes: {
        standardVAT: 0.21   // 21% VAT for Netherlands
    }
};

console.log("[PRICING CALCULATOR] Pricing database loaded successfully");
console.log("[PRICING CALCULATOR] Available products:", Object.keys(pricingData.glasses).length);
console.log("[PRICING CALCULATOR] Available discount types:", Object.keys(pricingData.discounts).length);

// ==================== CORE PRICING FUNCTIONS ====================

/**
 * Calculate price for a single product
 * @param {string} productId - The product identifier
 * @returns {object} Price calculation result
 */
function calculateProductPrice(productId) {
    console.log("[PRICING CALCULATOR] calculateProductPrice() called with productId: '" + productId + "'");
    
    if (!pricingData.glasses[productId]) {
        console.error("[PRICING CALCULATOR] ERROR: Product not found - '" + productId + "'");
        return null;
    }
    
    const product = pricingData.glasses[productId];
    console.log("[PRICING CALCULATOR] Product found:", product.name);
    console.log("[PRICING CALCULATOR] Base price: €" + product.basePrice.toFixed(2));
    
    const result = {
        productId: productId,
        productName: product.name,
        basePrice: product.basePrice,
        currency: product.currency,
        calculatedAt: new Date().toISOString()
    };
    
    console.log("[PRICING CALCULATOR] Product price calculation result:", result);
    return result;
}

/**
 * Apply discount to a price
 * @param {number} price - Base price
 * @param {string} discountType - Type of discount to apply
 * @returns {object} Discount calculation details
 */
function applyDiscount(price, discountType) {
    console.log("[PRICING CALCULATOR] applyDiscount() called");
    console.log("[PRICING CALCULATOR] Input price: €" + price.toFixed(2));
    console.log("[PRICING CALCULATOR] Discount type: '" + discountType + "'");
    
    if (!pricingData.discounts[discountType]) {
        console.warn("[PRICING CALCULATOR] WARNING: Unknown discount type - '" + discountType + "', using 0% discount");
        return {
            originalPrice: price,
            discountType: discountType,
            discountPercentage: 0,
            discountAmount: 0,
            finalPrice: price
        };
    }
    
    const discountPercentage = pricingData.discounts[discountType];
    console.log("[PRICING CALCULATOR] Discount percentage: " + (discountPercentage * 100) + "%");
    
    const discountAmount = price * discountPercentage;
    console.log("[PRICING CALCULATOR] Discount amount: €" + discountAmount.toFixed(2));
    
    const finalPrice = price - discountAmount;
    console.log("[PRICING CALCULATOR] Final price after discount: €" + finalPrice.toFixed(2));
    
    const result = {
        originalPrice: price,
        discountType: discountType,
        discountPercentage: discountPercentage * 100,
        discountAmount: discountAmount,
        finalPrice: finalPrice,
        savings: discountAmount
    };
    
    console.log("[PRICING CALCULATOR] Discount result object:", result);
    return result;
}

/**
 * Calculate VAT/Tax on a price
 * @param {number} price - Price before tax
 * @param {number} taxRate - Tax rate (default: standard VAT)
 * @returns {object} Tax calculation details
 */
function calculateTax(price, taxRate) {
    console.log("[PRICING CALCULATOR] calculateTax() called");
    console.log("[PRICING CALCULATOR] Price before tax: €" + price.toFixed(2));
    
    const rate = taxRate || pricingData.taxes.standardVAT;
    console.log("[PRICING CALCULATOR] Tax rate: " + (rate * 100) + "%");
    
    const taxAmount = price * rate;
    console.log("[PRICING CALCULATOR] Tax amount: €" + taxAmount.toFixed(2));
    
    const priceWithTax = price + taxAmount;
    console.log("[PRICING CALCULATOR] Price including tax: €" + priceWithTax.toFixed(2));
    
    const result = {
        priceBeforeTax: price,
        taxRate: rate * 100,
        taxAmount: taxAmount,
        priceAfterTax: priceWithTax
    };
    
    console.log("[PRICING CALCULATOR] Tax calculation result:", result);
    return result;
}

/**
 * Calculate complete price with discount and tax
 * @param {number} basePrice - The base price
 * @param {string} discountType - Type of discount (optional)
 * @param {number} taxRate - Tax rate (optional, uses standard VAT if not provided)
 * @returns {object} Complete pricing breakdown
 */
function calculateCompletePrice(basePrice, discountType, taxRate) {
    console.log("[PRICING CALCULATOR] calculateCompletePrice() called");
    console.log("[PRICING CALCULATOR] ==================== COMPLETE PRICE CALCULATION ====================");
    console.log("[PRICING CALCULATOR] Base price: €" + basePrice.toFixed(2));
    console.log("[PRICING CALCULATOR] Discount type: " + (discountType || 'none'));
    console.log("[PRICING CALCULATOR] Tax rate: " + ((taxRate || pricingData.taxes.standardVAT) * 100) + "%");
    
    let priceAfterDiscount = basePrice;
    let discountDetails = null;
    
    // Apply discount if specified
    if (discountType) {
        console.log("[PRICING CALCULATOR] Applying discount...");
        discountDetails = applyDiscount(basePrice, discountType);
        priceAfterDiscount = discountDetails.finalPrice;
    } else {
        console.log("[PRICING CALCULATOR] No discount applied");
    }
    
    // Calculate tax
    console.log("[PRICING CALCULATOR] Calculating tax...");
    const taxDetails = calculateTax(priceAfterDiscount, taxRate);
    
    const result = {
        basePrice: basePrice,
        discountType: discountType || 'none',
        discountDetails: discountDetails,
        priceAfterDiscount: priceAfterDiscount,
        taxDetails: taxDetails,
        finalPrice: taxDetails.priceAfterTax,
        currency: 'EUR',
        calculatedAt: new Date().toISOString()
    };
    
    console.log("[PRICING CALCULATOR] ==================== FINAL PRICING SUMMARY ====================");
    console.log("[PRICING CALCULATOR] Base Price: €" + result.basePrice.toFixed(2));
    if (discountDetails) {
        console.log("[PRICING CALCULATOR] Discount (" + result.discountType + "): -€" + discountDetails.discountAmount.toFixed(2));
    }
    console.log("[PRICING CALCULATOR] Subtotal: €" + result.priceAfterDiscount.toFixed(2));
    console.log("[PRICING CALCULATOR] VAT (" + taxDetails.taxRate + "%): €" + taxDetails.taxAmount.toFixed(2));
    console.log("[PRICING CALCULATOR] FINAL TOTAL: €" + result.finalPrice.toFixed(2));
    console.log("[PRICING CALCULATOR] ==================== CALCULATION COMPLETE ====================");
    
    return result;
}

/**
 * Calculate bulk pricing for multiple items
 * @param {number} price - Unit price
 * @param {number} quantity - Number of items
 * @returns {object} Bulk pricing calculation
 */
function calculateBulkPrice(price, quantity) {
    console.log("[PRICING CALCULATOR] calculateBulkPrice() called");
    console.log("[PRICING CALCULATOR] Unit price: €" + price.toFixed(2));
    console.log("[PRICING CALCULATOR] Quantity: " + quantity + " items");
    
    const subtotal = price * quantity;
    console.log("[PRICING CALCULATOR] Subtotal (before bulk discount): €" + subtotal.toFixed(2));
    
    // Apply bulk discount if quantity > 1
    let bulkDiscount = null;
    let finalPrice = subtotal;
    
    if (quantity > 1) {
        console.log("[PRICING CALCULATOR] Quantity > 1, applying bulk discount...");
        bulkDiscount = applyDiscount(subtotal, 'bulk');
        finalPrice = bulkDiscount.finalPrice;
    } else {
        console.log("[PRICING CALCULATOR] Quantity = 1, no bulk discount applicable");
    }
    
    const result = {
        unitPrice: price,
        quantity: quantity,
        subtotal: subtotal,
        bulkDiscount: bulkDiscount,
        finalPrice: finalPrice,
        pricePerUnit: finalPrice / quantity
    };
    
    console.log("[PRICING CALCULATOR] Bulk pricing result:");
    console.log("  - Unit price: €" + result.unitPrice.toFixed(2));
    console.log("  - Total units: " + result.quantity);
    console.log("  - Final total: €" + result.finalPrice.toFixed(2));
    console.log("  - Effective price per unit: €" + result.pricePerUnit.toFixed(2));
    
    return result;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format price as currency string
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
function formatPrice(price) {
    console.log("[PRICING CALCULATOR] formatPrice() called with value: " + price);
    const formatted = '€' + price.toFixed(2);
    console.log("[PRICING CALCULATOR] Formatted result: " + formatted);
    return formatted;
}

/**
 * Get all available products
 * @returns {array} List of products
 */
function getAllProducts() {
    console.log("[PRICING CALCULATOR] getAllProducts() called");
    const products = Object.keys(pricingData.glasses).map(id => {
        const product = pricingData.glasses[id];
        console.log("[PRICING CALCULATOR] Product: " + product.name + " - €" + product.basePrice.toFixed(2));
        return {
            id: id,
            name: product.name,
            price: product.basePrice
        };
    });
    console.log("[PRICING CALCULATOR] Returned " + products.length + " products");
    return products;
}

console.log("[PRICING CALCULATOR] All pricing functions initialized successfully");
console.log("[PRICING CALCULATOR] Available functions:");
console.log("  - calculateProductPrice()");
console.log("  - applyDiscount()");
console.log("  - calculateTax()");
console.log("  - calculateCompletePrice()");
console.log("  - calculateBulkPrice()");
console.log("  - formatPrice()");
console.log("  - getAllProducts()");
console.log("[PRICING CALCULATOR] Script execution finished");
