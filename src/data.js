var data_pr = {
  primary: {
    desc: 'primary',
    prRatios: [
      {
        cat: 0,
        pr: 0.500
      },
      {
        cat: 1,
        pr: 0.200
      },
      {
        cat: 2,
        pr: 0.150
      },
      {
        cat: 3,
        pr: 0.150
      }
    ]
  },
  secondary: {
    desc: 'secondary',
    prRatios: [
      {
        cat: 0,
        pr: 0.800
      },
      {
        cat: 1,
        pr: 0.100
      },
      {
        cat: 2,
        pr: 0.060
      },
      {
        cat: 3,
        pr: 0.040
      }
    ]
  },
  motionGroup: {
    desc: 'motions',
    prRatios: [
      {
        cat: 0,
        desc: 'presence',
        prRatios: [
          {
            code: '0-0-1',
            pr: 1.000
          }
        ]
      },
      {
        cat: 1,
        desc: 'presence',
        prRatios: [
          {
            code: '0-1-1',
            pr: 0.400
          },
          {
            code: '0-1-2',
            pr: 0.600
          },
        ]
      },
      {
        cat: 2,
        desc: 'job',
        prRatios: [
          {
            code: '0-2-1',
            pr: 0.300
          },
          {
            code: '0-2-2',
            pr: 0.300
          },
          {
            code: '0-2-3',
            pr: 0.200
          },
          {
            code: '0-2-4',
            pr: 0.200
          }
        ]
      },
      {
        cat: 3,
        desc: 'social',
        prRatios: [
          {
            code: '0-3-1',
            pr: 0.200
          },
          {
            code: '0-3-2',
            pr: 0.250
          },
          {
            code: '0-3-3',
            pr: 0.250
          },
          {
            code: '0-3-4',
            pr: 0.300
          }
        ]
      }
    ]
  }
};

export {data_pr};
