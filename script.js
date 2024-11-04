$(document).ready(function () {
    const fadeDuration = 300; 
    const defaultFilter = 'all';
    // Filter gallery items
    $('.filter-button').click(function () {
        let category = $(this).data('filter');

        if (category === 'all') {
            $('.gallery-item').fadeIn();
        } else {
            $('.gallery-item').hide();
            $(`.gallery-item[data-category="${category}"]`).fadeIn();
        }
    });

    
        // Track the current rotation degree for each image
        $('.gallery-item img').each(function () {
            $(this).data('rotation', 0); 
        });
    
        // Rotate image on clicking the rotate button
        $('.rotate-button').click(function (e) {
            e.stopPropagation(); 
    
            const img = $(this).siblings('img');
            let currentRotation = img.data('rotation');
            currentRotation += 90; // Rotate 90 degrees clockwise on each click
            img.css('transform', `rotate(${currentRotation}deg)`);
            img.data('rotation', currentRotation % 360); 
        });
    
        // Existing filter and lightbox functions remain here...
    
    });
    
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // Search functionality
    function searchImages() {
        let searchQuery = $('#search-input').val().trim(); // Get the input value
        searchQuery = capitalizeFirstLetter(searchQuery);   // Format input to capitalize the first letter

        if (searchQuery) {
            // Loop through each image in the gallery and check if its alt text includes the search query
            $('.gallery-item').each(function () {
                const altText = $(this).find('img').attr('alt'); // Get the alt text of the image
                if (altText.includes(searchQuery)) {
                    $(this).fadeIn(fadeDuration); // Show images that match the search
                } else {
                    $(this).fadeOut(fadeDuration); // Hide images that don't match
                }
            });
        } else {
            // If search input is empty, show all images
            $('.gallery-item').fadeIn(fadeDuration);
        }
    }

    // Search button click event
    $('#search-button').click(function () {
        searchImages(); // Call the search function when the search button is clicked
    });

    // Enter keypress event on the search input field
    $('#search-input').keypress(function (e) {
        if (e.which === 13) { // Check if Enter key is pressed
            searchImages(); // Call the search function when Enter is pressed
        }
    });


    // Enter keypress event on the search input
    // $('#search-input').keypress(function (e) {
    //     if (e.which === 13) { // Enter key is pressed
    //         searchImages();
    //     }
    // });

    // Lightbox functionality
    $('.gallery-item img').click(function () {
        let src = $(this).attr('src');
        $('.lightbox-content').attr('src', src);
        $('.lightbox').fadeIn();
    });

    // Close lightbox
    $('.close, .lightbox').click(function () {
        $('.lightbox').fadeOut();
    });

    // Prevent lightbox close when clicking the image
    $('.lightbox-image').click(function (e) {
        e.stopPropagation();
    });



