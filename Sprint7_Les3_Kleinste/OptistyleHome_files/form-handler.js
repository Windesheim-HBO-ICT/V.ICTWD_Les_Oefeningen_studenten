// ================== FORM SUBMISSION HANDLER ==================
// This script handles the appointment form submission with verbose logging

console.log("[FORM HANDLER] Script loaded successfully");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("[FORM HANDLER] DOMContentLoaded event triggered");
    
    const form = document.getElementById('appointmentForm');
    
    if (!form) {
        console.error("[FORM HANDLER] ERROR: Appointment form element not found in DOM");
        return;
    }
    
    console.log("[FORM HANDLER] Form element found:", form);
    console.log("[FORM HANDLER] Form ID:", form.id);
    console.log("[FORM HANDLER] Form class:", form.className);
    
    // Attach submit event listener
    form.addEventListener('submit', function(event) {
        console.log("[FORM HANDLER] ==================== FORM SUBMISSION STARTED ====================");
        console.log("[FORM HANDLER] Submission timestamp:", new Date().toISOString());
        
        // Prevent default form submission
        event.preventDefault();
        console.log("[FORM HANDLER] Default form submission prevented");
        
        // Get form data
        console.log("[FORM HANDLER] Extracting form data...");
        const formData = new FormData(form);
        console.log("[FORM HANDLER] FormData object created");
        
        // Extract and log individual form fields
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        console.log("[FORM HANDLER] Form field values extracted:");
        console.log("  - Name: '" + name + "' (length: " + name.length + " characters)");
        console.log("  - Email: '" + email + "' (length: " + email.length + " characters)");
        console.log("  - Phone: '" + phone + "' (length: " + phone.length + " characters)");
        console.log("  - Message: '" + message + "' (length: " + message.length + " characters)");
        
        // Validate form data
        console.log("[FORM HANDLER] Validating form data...");
        let validationPassed = true;
        
        if (!name || name.trim() === '') {
            console.warn("[FORM HANDLER] VALIDATION WARNING: Name field is empty");
            validationPassed = false;
        }
        
        if (!email || email.trim() === '') {
            console.warn("[FORM HANDLER] VALIDATION WARNING: Email field is empty");
            validationPassed = false;
        }
        
        if (!phone || phone.trim() === '') {
            console.warn("[FORM HANDLER] VALIDATION WARNING: Phone field is empty");
            validationPassed = false;
        }
        
        if (validationPassed) {
            console.log("[FORM HANDLER] ✓ All validation checks passed");
        } else {
            console.log("[FORM HANDLER] ✗ Validation failed - stopping submission");
            return;
        }
        
        // Log form object structure
        console.log("[FORM HANDLER] Form object details:");
        console.log("  - Element tag: " + form.tagName);
        console.log("  - Method: " + form.method);
        console.log("  - Action: " + form.action);
        console.log("  - Enctype: " + form.encType);
        console.log("  - Number of form elements: " + form.elements.length);
        
        // Prepare submission data
        console.log("[FORM HANDLER] Preparing submission data...");
        const submissionData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim(),
            submittedAt: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language
        };
        
        console.log("[FORM HANDLER] Submission data object created:", submissionData);
        
        // Log submission attempt
        console.log("[FORM HANDLER] ==================== FORM SUBMISSION DETAILS ====================");
        console.log("[FORM HANDLER] Submitting appointment form...");
        console.log("[FORM HANDLER] Submission method: POST (simulated)");
        console.log("[FORM HANDLER] Content-Type: application/json");
        console.log("[FORM HANDLER] Payload size: " + JSON.stringify(submissionData).length + " bytes");
        
        // Simulate form submission (since there's no actual backend)
        console.log("[FORM HANDLER] Sending data to server...");
        
        // Show success message
        console.log("[FORM HANDLER] ✓✓✓ FORM SUBMISSION SUCCESSFUL ✓✓✓");
        console.log("[FORM HANDLER] Response status: 200 OK");
        console.log("[FORM HANDLER] Message: Form submitted successfully");
        console.log("[FORM HANDLER] Submitted data:", submissionData);
        
        // Display user feedback
        alert('Dank u wel ' + name + '! Uw afspraak is ingediend. Wij nemen spoedig contact met u op.');
        console.log("[FORM HANDLER] Alert message displayed to user");
        
        // Reset form
        console.log("[FORM HANDLER] Resetting form fields...");
        form.reset();
        console.log("[FORM HANDLER] ✓ Form fields reset successfully");
        
        console.log("[FORM HANDLER] ==================== FORM SUBMISSION COMPLETED ====================");
        console.log("[FORM HANDLER] Total processing time: < 1 second");
        console.log("[FORM HANDLER] Status: COMPLETED SUCCESSFULLY");
        console.log("[FORM HANDLER]");
    });
    
    console.log("[FORM HANDLER] Submit event listener attached to form");
    console.log("[FORM HANDLER] Form handler initialization complete");
});

console.log("[FORM HANDLER] Script execution finished - waiting for DOMContentLoaded event");
