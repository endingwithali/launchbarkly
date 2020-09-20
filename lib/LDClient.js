import LaunchDarkly from 'launchdarkly-node-server-sdk'

const darkly = LaunchDarkly.init(process.env.LD_TEST_SDK_KEY)

process.on('SIGTERM', () => {
    darkly.close();
  })

module.exports = darkly