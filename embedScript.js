// Function to dynamically load a CSS file
// const loadCSS = (cssUrl) => {
//   const link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.href = cssUrl;
//   link.type = 'text/css';
//   document.head.appendChild(link);
// };

// // Load the CSS file
// loadCSS('summary-style.css'); // Replace with your hosted CSS file URL

document.addEventListener('DOMContentLoaded', window.GetSummaryBanner = (id, targetSelector = '#my-custom-container') => {
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

  const fetchAdApi = async (type) => {
    try {
      const res = await fetch(`https://post-summary.yukta.one/api/ad?type=${type}`);
      const data = await res.json();
      if (data?.ad_html) {
        return data.ad_html;
      }
    } catch (error) {
      console.error('Error fetching ad data:', error);
      return null;
    }
  }

  const RenderSummaryBanner = async (bannerId, targetSelector) => {
    const summary = await fetchApi(bannerId);
    const adHtml = await fetchAdApi('summary')

    const renderSummaryHeading = () => {
      const headingContainer = document.createElement('div')
      headingContainer.classList.add('heading-container')

      const headingBG = document.createElement('div')
      headingBG.classList.add('heading-container-bg')

      const pluginName = document.createElement('div');
      pluginName.classList.add('plugin-name');
      pluginName.textContent = 'YM Summary';

      const headingContent = document.createElement('div')
      headingContent.classList.add('heading-content')

      const headingText = document.createElement('div')
      headingContent.classList.add('heading-text')
      headingText.innerHTML = '<h3 class="summary-heading">Gift and Voucher for Premium Customers</h3><a href="https://eplus.yukta.one">View T&amp;C</a>'

      const headingIcon = document.createElement('div')
      headingContent.classList.add('heading-icon')
      headingIcon.innerHTML = '<img alt="#" data-src="https://eplus.yukta.one/wp-content/plugins/summary-quiz-ad/assets/img/Untitled-1.gif" class=" lazyloaded" src="https://eplus.yukta.one/wp-content/plugins/summary-quiz-ad/assets/img/Untitled-1.gif">'

      headingContent.appendChild(headingText)
      headingContent.appendChild(headingIcon)

      headingContainer.appendChild(headingBG);
      headingContainer.appendChild(pluginName);
      headingContainer.appendChild(headingContent);

      return headingContainer;
    }

    if (summary && adHtml) {
      //The parentContainer
      const summaryContainer = document.createElement('div');
      summaryContainer.classList.add('summary-container');      

      // Create the banner container
      const summaryContentWrapper = document.createElement('div');
      summaryContentWrapper.classList.add('summary-content-wrapper');
      summaryContentWrapper.id = `banner-${bannerId}`;

      const pluginData = document.createElement('div');
      pluginData.classList.add('plugin-data');

      const summaryContentBlock = document.createElement('div');
      summaryContentBlock.classList.add('summary-content-block');

      //for ad
      const AdContent = document.createElement('div');
      AdContent.classList.add('ad-content');
      AdContent.innerHTML = adHtml;

      // Radio buttons
      const radioContainer = document.createElement('div');
      radioContainer.classList.add('summary-controls')

      const radioName = `summaryType-${bannerId}`;

      const radioLong = document.createElement('input');
      radioLong.type = 'radio';
      radioLong.id = `long-${bannerId}`;
      radioLong.name = radioName;

      const radioMedium = document.createElement('input');
      radioMedium.type = 'radio';
      radioMedium.id = `medium-${bannerId}`;
      radioMedium.name = radioName;

      const radioShort = document.createElement('input');
      radioShort.type = 'radio';
      radioShort.id = `short-${bannerId}`;
      radioShort.name = radioName;
      radioShort.checked = true;

      const labelLong = document.createElement('label');
      labelLong.setAttribute('for', `long-${bannerId}`);
      labelLong.textContent = 'Long';
      labelLong.appendChild(radioLong)

      const labelMedium = document.createElement('label');
      labelMedium.setAttribute('for', `medium-${bannerId}`);
      labelMedium.textContent = 'Medium';
      labelMedium.appendChild(radioMedium)

      const labelShort = document.createElement('label');
      labelShort.setAttribute('for', `short-${bannerId}`);
      labelShort.textContent = 'Short';
      labelShort.appendChild(radioShort)

      radioContainer.appendChild(labelShort);
      radioContainer.appendChild(labelMedium);
      radioContainer.appendChild(labelLong);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('summary-content');
      contentDiv.innerHTML = `<p>${summary.short}</p>`;

      summaryContentBlock.appendChild(radioContainer);
      summaryContentBlock.appendChild(contentDiv);

      pluginData.appendChild(summaryContentBlock)
      pluginData.appendChild(AdContent);

      summaryContentWrapper.appendChild(pluginData);
      
      const headingContainer = renderSummaryHeading()
      summaryContainer.appendChild(headingContainer);
      summaryContainer.appendChild(summaryContentWrapper);

      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.appendChild(summaryContainer);
      } else {
        console.error(`Target element "${targetSelector}" not found. Appending to body instead.`);
        document.body.appendChild(summaryContainer);
      }

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

  RenderSummaryBanner(id, targetSelector);
});
