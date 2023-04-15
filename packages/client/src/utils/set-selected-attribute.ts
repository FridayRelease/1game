export const setSelectedAttribute = (element: HTMLSelectElement | null, value: string) => {
  if (!element) {
    return;
  }

  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLOptionElement;
    child.removeAttribute('selected');
    if (child.value === value) {
      child.setAttribute('selected', value);
      element.setAttribute('value', value);
    }
  }
};
