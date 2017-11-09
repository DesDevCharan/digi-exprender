import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpUtilService } from '../../services/http-util.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MyDayService } from  '../../services/firebase-util.service';
import { UpdateService } from  '../../services/updatevalue-util.service';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.scss'],
})
export class ContentAreaComponent implements OnInit {

  date: Date;
  chartObj: Object;
  chart = [];
  apiRef = "10-26-2017";
  maxDate = new Date();
  constructor(
    private httpUtilService: HttpUtilService,
    private myDayService: MyDayService,
    private afd: AngularFireDatabase,
    private updateService: UpdateService
  ) {

  this.chartObj = {
      chart: {
          type: 'scatter',
          zoomType: 'xy',
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
               [0, '#2f3539'],
               [1, '#2f3539']
            ]
         },
         style: {
            fontFamily: '\'Unica One\', sans-serif'
         },
         plotBorderColor: '#2f3539'
      },
      title: {
          text: 'Daily Expression',
          style: {
            color: '#FFF',
            fontSize: '20px',
            fontWeight: '200',
            letterSpacing: '1px'
         }
      },
      subtitle: {
          text: 'Analytics generated via Tensorflow and Opencv'
      },
      xAxis: {
          title: {
              enabled: true,
              text: 'Time',
              style: {
                color: '#A0A0A3'
    
             }
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
          gridLineColor: '#707073',
          labels: {
             style: {
                color: '#E0E0E3'
             }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073'
      },
      yAxis: {
          title: {
              text: 'Mood',
              categories: ['<strong>Happy</strong>', '<strong>Sad</strong>', '<strong>Neutral</strong>', '<strong>Angry</strong>'],
              style: {
                color: '#A0A0A3'
              }
          },
          gridLineColor: '#707073',
          labels: {
             style: {
                color: '#E0E0E3'
             }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          categories: ['<strong>Happy</strong>', '<strong>Sad</strong>', '<strong>Neutral</strong>', '<strong>Angry</strong>'],
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 100,
          y: 70,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#22272b',
          borderWidth: 1,
          itemStyle: {
              color: '#E0E0E3'
          },
          itemHoverStyle: {
              color: '#FFF'
          },
          itemHiddenStyle: {
              color: '#606063'
          }
      },
      plotOptions: {
          boxplot: {
              fillColor: '#505053'
          },
          candlestick: {
              lineColor: 'white'
          },
          errorbar: {
              color: 'white'
          },
          scatter: {
              marker: {
                  radius: 5,
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)'
                      }
                  }
              },
              states: {
                  hover: {
                      marker: {
                          enabled: false
                      }
                  }
              },
              tooltip: {
                  headerFormat: '<b>{series.name}</b><br>',
                  pointFormat: '{point.x}, {point.y}',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  style: {
                     color: '#F0F0F0'
                  }
              }
          }
      },
      series: [{
          name: 'Female',
          color: 'rgba(223, 83, 83, .5)',
          dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#333'
          },
          data: [[15, 0], [35, 1],[55, 2], [65, 3],[75, 0], [70, 1],[65, 2], [25, 3],[15, 0], [105, 1],[85, 2], [95, 3]]
  
      }, {
          name: 'Male',
          color: 'rgba(119, 152, 191, .5)',
          data: [[100, 2], [90, 3],[60, 0], [50, 1],[30, 2], [20, 3],[30, 0], [10, 1],[110, 2], [80, 3],[90, 0], [50, 1],[60, 2], [20, 3]]
      }],
      
    };
  }



  //   this.chartObj = {
  //     chart: {
  //       type: 'columnrange',
  //       inverted: true
  //     },
  //     title: {
  //       text: 'Variation of Moods in a day'
  //     },
  //     // subtitle: {
  //     //   text: 'Observed in Vik i Sogn, Norway'
  //     // },
  //     xAxis: {
  //       categories: ['<strong>Happy</strong>', '<strong>Sad</strong>', '<strong>Neutral</strong>', '<strong>Angry</strong>']
  //     },
  //     yAxis: {
  //       title: {
  //         text: 'Hours (hrs)'
  //       }
  //     },
  //     tooltip: {
  //       valueSuffix: ''
  //     },
  //     plotOptions: {
  //       columnrange: {
  //         dataLabels: {
  //           enabled: true,
  //           formatter: function () {
  //             return this.y;
  //           }
  //         }
  //       }
  //     },
  //     legend: {
  //       enabled: false
  //     },
  //     series: [{
  //       name: 'Mood',
  //       data: [
  //         [6, 10],
  //         [10, 16],
  //         [16, 19],
  //         [19, 24]
  //       ]
  //     }],
  //     credits: {
  //       enabled: false
  //     },
  //     exporting: { enabled: false }
  //   };
  // }

  ngOnInit() {
    this.convertDate(this.apiRef);
    this.generateRangeData();
    this.chart.push(Highcharts.chart('ranges', this.chartObj));
  }
  // this.chart['series'][0].setData(temp);   to update
  refreshData() {
    const temp = {
      name: '<strong>Mood</strong>',
      data: [
 
      ]
    };
    //console.log(this.chart[0]);
    //this.chart[0].update({ series: temp });
  }

  convertDate(selectedDate) {
    if(!selectedDate){
      this.date = new Date();
    }else{
      this.date = new Date(selectedDate);
    }
    
    var day = this.date.getDate();
    var month = this.date.getMonth() + 1;
    var year = this.date.getFullYear();

    this.apiRef = year + "-" + ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2);
  }

  generateRangeData() {
    this.myDayService.apiRef = this.apiRef;

    this.myDayService.getCurrentData().subscribe((data) => {
      this.getGenderMoodData(data);
      //console.log(data);
      //this.updateService.updateFactors(data);
      //this.chart[0].update({ series: { data: data[0] } });
    });
  }

  getGenderMoodData(data){
    var genderData = {"male":0,"female":0, "total":0, "malePerc":0,"femalePerc":0};
    var moodData = {"angry":0,"sad":0,"happy":0, "neutral":0, "total":0,"angryPerc":0, "sadPerc":0, "happyPerc":0, "neutralPerc":0};
    for (var i = 0; i < data.length; i++){
      var round1 = data[i];
      for (var j = 0; j < round1.length; j++){
        var round2 = round1[j];
        for (var prop in round2){
          var lastData = round2[prop];
          for(var k = 0; k < lastData.length; k++){
            var tempData = lastData[k].split(" ");
            genderData.total++;
            if(tempData[0] == "man"){
              genderData.male++;
            }else{
              genderData.female++;
            }
            genderData.malePerc = Math.round(((genderData.male * 100) / genderData.total) * 100)/100;
            genderData.femalePerc = Math.round(((genderData.female * 100) / genderData.total) * 100)/100;
            

            moodData.total++;
            switch(tempData[1]){
              case "angry":
                moodData.angry++;
                break;
              case "sad":
                moodData.sad++;
                break;
              case "happy":
                moodData.happy++;
                break;
              case "neutral":
                moodData.neutral++;
                break;
            }
            moodData.angryPerc = Math.round(((moodData.angry * 100) / moodData.total) * 100)/100;
            moodData.happyPerc = Math.round(((moodData.happy * 100) / moodData.total) * 100)/100;
            moodData.neutralPerc = Math.round(((moodData.neutral * 100) / moodData.total) * 100)/100;
            moodData.sadPerc = Math.round(((moodData.sad * 100) / moodData.total) * 100)/100;
          }
        }
      }
    }
    
    //console.log(genderData);
    //console.log(moodData);

    var dataToSend = [genderData, moodData];
    this.updateService.updateFactors(dataToSend);
  }
  
  dateChanged(date) {
    this.convertDate(date);
    this.generateRangeData();
  }
}
