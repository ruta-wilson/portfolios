/**
 * Populates every .share-row element with working share buttons:
 * X (Twitter), LinkedIn, WhatsApp, and Copy Link.
 * Each row needs data-share-title and data-share-anchor attributes.
 */
function initShareRows() {
  var rows = document.querySelectorAll('.share-row');

  rows.forEach(function (row) {
    var title = row.getAttribute('data-share-title') || document.title;
    var anchor = row.getAttribute('data-share-anchor');
    var url = window.location.origin + window.location.pathname + (anchor ? '#' + anchor : '');
    var encodedUrl = encodeURIComponent(url);
    var encodedTitle = encodeURIComponent(title);

    row.innerHTML =
      '<span class="share-label">Share:</span>' +
      '<button type="button" class="share-x" aria-label="Share on X" title="Share on X"><i class="bi bi-twitter-x"></i></button>' +
      '<button type="button" class="share-linkedin" aria-label="Share on LinkedIn" title="Share on LinkedIn"><i class="bi bi-linkedin"></i></button>' +
      '<button type="button" class="share-whatsapp" aria-label="Share on WhatsApp" title="Share on WhatsApp"><i class="bi bi-whatsapp"></i></button>' +
      '<button type="button" class="share-copy" aria-label="Copy link" title="Copy link"><i class="bi bi-link-45deg"></i></button>' +
      '<span class="copy-toast">Link copied!</span>';

    row.querySelector('.share-x').addEventListener('click', function () {
      window.open('https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl, '_blank', 'noopener,width=550,height=420');
    });

    row.querySelector('.share-linkedin').addEventListener('click', function () {
      window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl, '_blank', 'noopener,width=550,height=520');
    });

    row.querySelector('.share-whatsapp').addEventListener('click', function () {
      window.open('https://wa.me/?text=' + encodedTitle + '%20' + encodedUrl, '_blank', 'noopener');
    });

    row.querySelector('.share-copy').addEventListener('click', function () {
      var toast = row.querySelector('.copy-toast');
      navigator.clipboard.writeText(url).then(function () {
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 1800);
      });
    });
  });
}

// This script is loaded at the end of <body>, after the DOM is already
// parsed, so 'DOMContentLoaded' may have already fired — run immediately,
// but fall back to the event for safety if the DOM isn't ready yet.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShareRows);
} else {
  initShareRows();
}
