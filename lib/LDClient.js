import LaunchDarkly from 'launchdarkly-node-server-sdk'

const darkly = LaunchDarkly.init(process.env.LD_TEST_SDK_KEY)
module.exports = darkly




