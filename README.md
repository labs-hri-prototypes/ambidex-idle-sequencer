# ambidex-idle-sequencer

## Simulator
https://labs-hri-prototypes.github.io/ambidex-idle-sequencer/

## Sequence logic
![flow](https://github.com/labs-hri-prototypes/ambidex-idle-sequencer/blob/main/flow_v1.png)

## Default value

<table>
<thead>
<th> input </th>
<th> output primary </th>
  <th> output secondary </th>
</thead>
<tbody>
<tr>
<td valign="top">
        
```json
{
  "primary": {
    "desc": "primary",
    "prRatios": [
      {
        "cat": 0,
        "pr": 0.500
      },
      {
        "cat": 1,
        "pr": 0.250
      },
      {
        "cat": 2,
        "pr": 0.150
      },
      {
        "cat": 3,
        "pr": 0.100
      }
    ]
  },
  "secondary": {
    "desc": "secondary",
    "prRatios": [
      {
        "cat": 0,
        "pr": 0.800
      },
      {
        "cat": 1,
        "pr": 0.100
      },
      {
        "cat": 2,
        "pr": 0.050
      },
      {
        "cat": 3,
        "pr": 0.050
      }
    ]
  },
  "motionGroup": {
    "desc": "motions",
    "prRatios": [
      {
        "cat": 0,
        "desc": "presence",
        "prRatios": [
          {
            "code": "1-a",
            "pr": 1.000
          }
        ]
      },
      {
        "cat": 1,
        "desc": "presence",
        "prRatios": [
          {
            "code": "1-b",
            "pr": 0.500
          },
          {
            "code": "1-c",
            "pr": 0.500
          },
        ]
      },
      {
        "cat": 2,
        "desc": "job",
        "prRatios": [
          {
            "code": "2-3-a",
            "pr": 0.500
          },
          {
            "code": "2-3-b",
            "pr": 0.500
          }
        ]
      },
      {
        "cat": 3,
        "desc": "social",
        "prRatios": [
          {
            "code": "3-1-a",
            "pr": 0.400
          },
          {
            "code": "3-1-b",
            "pr": 0.300
          },
          {
            "code": "3-1-c",
            "pr": 0.300
          }
        ]
      }
    ]
  }
}
```

</td>
<td valign="top">

```json
{
"prOutPrimary": [
  {
    "code": "1-a",
    "pr": 0.5,
    "cat": 0
  },
  {
    "code": "1-b",
    "pr": 0.625,
    "cat": 1
  },
  {
    "code": "1-c",
    "pr": 0.75,
    "cat": 1
  },
  {
    "code": "2-3-a",
    "pr": 0.825,
    "cat": 2
  },
  {
    "code": "2-3-b",
    "pr": 0.9,
    "cat": 2
  },
  {
    "code": "3-1-a",
    "pr": 0.93,
    "cat": 3
  },
  {
    "code": "3-1-b",
    "pr": 0.96,
    "cat": 3
  },
  {
    "code": "3-1-c",
    "pr": 1.0,
    "cat": 3
  }
]}
```

</td>
<td valign="top">

```json
{
"prOutSecondary": [
  {
    "code": "1-a",
    "pr": 0.8,
    "cat": 0
  },
  {
    "code": "1-b",
    "pr": 0.85,
    "cat": 1
  },
  {
    "code": "1-c",
    "pr": 0.9,
    "cat": 1
  },
  {
    "code": "2-3-a",
    "pr": 0.925,
    "cat": 2
  },
  {
    "code": "2-3-b",
    "pr": 0.95,
    "cat": 2
  },
  {
    "code": "3-1-a",
    "pr": 0.965,
    "cat": 3
  },
  {
    "code": "3-1-b",
    "pr": 0.98,
    "cat": 3
  },
  {
    "code": "3-1-c",
    "pr": 1.0,
    "cat": 3
  }
]}
```

</td>
</tr>
</tbody>
</table>
