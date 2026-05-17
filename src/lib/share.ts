export function getTourShareUrl(tourId: string): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return `${window.location.origin}/tours/${tourId}`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false
    );
  }
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve(true);
  } catch (err) {
    console.error('Failed to copy text:', err);
    document.body.removeChild(textArea);
    return Promise.resolve(false);
  }
}

const constructTourShareMessage = (url: string, tourName: string): string => {
  return encodeURIComponent(`Check out this amazing heritage tour: ${tourName}\n\nI thought you might be interested in this experience:\n\n${tourName}\n${url}`);
};

export function shareToFacebook(url: string, title: string): void {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export function shareToTwitter(url: string, title: string): void {
  const text = `Discover this amazing tour: ${title}. Join me on this heritage journey! #TravelGram #HeritageTrail`;
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export function shareToInstagram(): void {
  alert('On Instagram, you can share this tour link directly in your Bio or DM it to friends!');
}

export function shareToTikTok(url: string, title: string): void {
  const shareUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export function shareToLinkedIn(url: string, title: string): void {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export function shareToWhatsApp(url: string, tourName: string): void {
  const shareUrl = `https://wa.me/?text=${constructTourShareMessage(url, tourName)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

export function shareViaEmail(url: string, tourName: string): void {
  const subject = encodeURIComponent(`Explore this amazing heritage tour: ${tourName}`);
  const body = encodeURIComponent(`Hi,\n\nI found this amazing heritage tour that I think you'd love:\n\n${tourName}\n${url}\n\nCheck it out!`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}