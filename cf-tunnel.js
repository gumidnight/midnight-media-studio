const { tunnel } = require('cloudflared');

(async () => {
  const { url, connections, child, stop } = tunnel({ '--url': 'http://localhost:3000' });
  
  // Wait for the URL
  const publicUrl = await url;
  
  console.log('\n========================================');
  console.log('🚀 Your site is live at:');
  console.log(publicUrl);
  console.log('========================================\n');
  console.log('Press Ctrl+C to stop the tunnel');
  
  // Keep the process alive
  process.on('SIGINT', () => {
    stop();
    process.exit();
  });
})();
