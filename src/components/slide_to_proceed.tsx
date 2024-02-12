import { get } from 'http';
import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';

interface SliderProps {
  onValueChange: (value: number) => void;
}

export default class Slider extends React.Component<SliderProps> {
  state = { values: [0] };

  handleValueChange = (values: any) => {
    this.setState({ values });
    // Pass the updated value to the parent component
    if (this.props.onValueChange) {
      this.props.onValueChange(values[0]);
    }
  };

  render() {
    return (
      <>
        <div className='flex flex-col w-full text-center px-8 gap-4'>
          <h3>Slide untuk melanjutkan</h3>
          <div className='regular'>
            <div className='px-5 bg-gradient-to-r from-[#DC7C7C] from-10% to-[#ccc] to-90%'>
              <Range
                min={0}
                max={100}
                values={this.state.values}
                onChange={this.handleValueChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '42px',
                      width: '100%',
                      background: getTrackBackground({
                        values: this.state.values,
                        colors: ["#DC7C7C", "#ccc"],
                        min: 0,
                        max: 100
                      }),
                      alignSelf: "center"
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div className='regular text-[#E3E3E3] text-center'
                    {...props}
                    style={{
                      ...props.style,
                      height: '42px',
                      width: '42px',
                      backgroundColor: '#999'
                    }}
                  >
                    |||
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}