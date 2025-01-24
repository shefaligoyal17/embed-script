const RenderSummaryBanner = async (bannerId, targetSelector = 'body') => {
  const summary = await fetchApi(bannerId);

  if (summary) {
    const div = document.createElement('div');
    div.classList.add('custom-data-box');
    div.style.border = "1px solid #ccc";
    div.style.padding = "20px";
    div.style.margin = "20px";
    div.style.backgroundColor = "#f4f4f4";
    div.id = `banner-${bannerId}`;

    const radioContainer = document.createElement('div');
    const radioName = `summaryType-${bannerId}`;

    const radioLong = document.createElement('input');
    radioLong.type = 'radio';
    radioLong.id = `long-${bannerId}`;
    radioLong.name = radioName;
    radioLong.checked = true;

    const radioMedium = document.createElement('input');
    radioMedium.type = 'radio';
    radioMedium.id = `medium-${bannerId}`;
    radioMedium.name = radioName;

    const radioShort = document.createElement('input');
    radioShort.type = 'radio';
    radioShort.id = `short-${bannerId}`;
    radioShort.name = radioName;

    const labelLong = document.createElement('label');
    labelLong.setAttribute('for', `long-${bannerId}`);
    labelLong.textContent = 'Long';

    const labelMedium = document.createElement('label');
    labelMedium.setAttribute('for', `medium-${bannerId}`);
    labelMedium.textContent = 'Medium';

    const labelShort = document.createElement('label');
    labelShort.setAttribute('for', `short-${bannerId}`);
    labelShort.textContent = 'Short';

    radioContainer.appendChild(radioLong);
    radioContainer.appendChild(labelLong);
    radioContainer.appendChild(radioMedium);
    radioContainer.appendChild(labelMedium);
    radioContainer.appendChild(radioShort);
    radioContainer.appendChild(labelShort);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('summary-content');
    contentDiv.innerHTML = `<p>${summary.long}</p>`;

    div.appendChild(radioContainer);
    div.appendChild(contentDiv);

    // Select the target element
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.appendChild(div);
    } else {
      console.error(`Target element "${targetSelector}" not found. Appending to body instead.`);
      document.body.appendChild(div);
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
