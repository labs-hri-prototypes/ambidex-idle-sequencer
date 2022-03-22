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
        pr: 0.250
      },
      {
        cat: 2,
        pr: 0.150
      },
      {
        cat: 3,
        pr: 0.100
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
        pr: 0.050
      },
      {
        cat: 3,
        pr: 0.050
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
            code: '1-a',
            pr: 1.000
          }
        ]
      },
      {
        cat: 1,
        desc: 'presence',
        prRatios: [
          {
            code: '1-b',
            pr: 0.400
          },
          {
            code: '1-c',
            pr: 0.600
          },
        ]
      },
      {
        cat: 2,
        desc: 'job',
        prRatios: [
          {
            code: '2-1',
            pr: 0.300
          },
          {
            code: '2-2',
            pr: 0.300
          },
          {
            code: '2-3-a',
            pr: 0.200
          },
          {
            code: '2-3-b',
            pr: 0.200
          }
        ]
      },
      {
        cat: 3,
        desc: 'social',
        prRatios: [
          {
            code: '3-1-a',
            pr: 0.200
          },
          {
            code: '3-1-b',
            pr: 0.250
          },
          {
            code: '3-1-c',
            pr: 0.250
          },
          {
            code: '3-2',
            pr: 0.300
          }
        ]
      }
    ]
  }
};

export {data_pr};
