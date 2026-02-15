const localtunnel = require('localtunnel');

(async function() {
  try {
    const tunnel = await localtunnel({ port: 3000, subdomain: 'midnight-media' });
    console.log('\n========================================');
    console.log('🚀 Your site is live at:');
    console.log(tunnel.url);
    console.log('========================================\n');
    console.log('Press Ctrl+C to stop the tunnel');
    
    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
  } catch (err) {
    console.error('Error starting tunnel:', err.message);
  }
})();
