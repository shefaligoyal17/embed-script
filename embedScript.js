const fetchApi = async (id) => {
  try {
    const res = await fetch(`https://post-summary.yukta.one/api/summary/${id}`);
    const data = await res.json();
    if (data?.summary) {
      return data.summary;
    } else if (data?.detail) {
      return data.detail;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const RenderSummaryBanner = async (bannerId) => {
  const summary = await fetchApi(bannerId);

  if (summary) {
    //container for the banner
    const div = document.createElement('div');
    div.classList.add('custom-data-box');
    div.style.border = "1px solid #ccc";
    div.style.padding = "20px";
    div.style.margin = "20px";
    div.style.backgroundColor = "#f4f4f4"
    div.id = `banner-${bannerId}`; // Unique ID for each banner

    //radio buttons for long, medium, and short
    const radioContainer = document.createElement('div');

    //a unique name for the radio buttons using the bannerId
    const radioName = `summaryType-${bannerId}`;

    const radioLong = document.createElement('input');
    radioLong.type = 'radio';
    radioLong.id = `long-${bannerId}`;
    radioLong.name = radioName; // Unique name for each banner's radio group
    radioLong.checked = true;  // Default to 'long'

    const radioMedium = document.createElement('input');
    radioMedium.type = 'radio';
    radioMedium.id = `medium-${bannerId}`;
    radioMedium.name = radioName;

    const radioShort = document.createElement('input');
    radioShort.type = 'radio';
    radioShort.id = `short-${bannerId}`;
    radioShort.name = radioName;

    //labels for radio buttons
    const labelLong = document.createElement('label');
    labelLong.setAttribute('for', `long-${bannerId}`);
    labelLong.textContent = 'Long';

    const labelMedium = document.createElement('label');
    labelMedium.setAttribute('for', `medium-${bannerId}`);
    labelMedium.textContent = 'Medium';

    const labelShort = document.createElement('label');
    labelShort.setAttribute('for', `short-${bannerId}`);
    labelShort.textContent = 'Short';

    // Append radio buttons and labels to the radio container
    radioContainer.appendChild(radioLong);
    radioContainer.appendChild(labelLong);
    radioContainer.appendChild(radioMedium);
    radioContainer.appendChild(labelMedium);
    radioContainer.appendChild(radioShort);
    radioContainer.appendChild(labelShort);

    //a container to display the content
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('summary-content');
    contentDiv.innerHTML = `<p>${summary.long}</p>`; // Default to showing 'long' content

    // Add the radio buttons and the content container to the main div
    div.appendChild(radioContainer);
    div.appendChild(contentDiv);

    // Insert the new element into the document body or a specific container
    document.body.appendChild(div);

    // Event listeners for radio buttons to update displayed content
    radioLong.addEventListener('change', () => {
      contentDiv.innerHTML = `<p>${summary.long}</p>`;
    });

    radioMedium.addEventListener('change', () => {
      contentDiv.innerHTML = `<p>${summary.medium}</p>`;
    });

    radioShort.addEventListener('change', () => {
      contentDiv.innerHTML = `<p>${summary.short}</p>`;
    });
  } else {
    console.error('No summary or detail available.');
  }
};


// Expose the RenderSummaryBanner function to the global window object
window.GetSummaryBanner = RenderSummaryBanner;