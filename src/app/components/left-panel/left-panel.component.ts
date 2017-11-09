import { Component, OnInit } from '@angular/core';
import { HttpUtilService } from '../../services/http-util.service';
import { UpdateService } from  '../../services/updatevalue-util.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  genderObj: Object;
  moodObj: Object;
  chart = [];
  dr: any;
  constructor(private updateService: UpdateService, private afd: AngularFireDatabase) {
    this.genderObj = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '100%',
        width: 225,
        backgroundColor: '#000000',
        borderWidth: 0
      },
      title: {
        text: 'Gender',
        align: 'center',
        style: {
          color: '#fff',
          fontWeight: 200,
          letterSpacing: 1,
          borderWidth: 0
        },
        // verticalAlign: 'middle',
        y: 30
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -20,
            style: {
              fontWeight: '200',
              color: 'white',
              borderWidth: 0,
              plotBorderWidth: 0,
              stroke: 'black'
            }
          },
          startAngle: 0,
          center: ['50%', '50%']
        }
      },
      series: [{
        type: 'pie',
        name: 'Population Ratio',
        innerSize: '70%',
        data: [
          {
            name: 'Loading...',
            y: 33.33,
            color: '#4db6ac'
          },
          {
            name: 'Loading...',
            y: 33.33,
            color: '#f06292'
          },
          {
            name: 'Loading...',
            y: 33.33,
            color: '#ffb74d'
          }
        ]
      }],
      credits: {
        enabled: false
      },
      exporting: { enabled: false }
    };

    this.moodObj = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '100%',
        width: 225,
        backgroundColor: '#000000',
        borderWidth: 0
      },
      title: {
        text: 'Moods',
        align: 'center',
        style: {
          color: '#fff',
          fontWeight: 200,
          letterSpacing: 1,
          borderWidth: 0
        },
        // verticalAlign: 'middle',
        y: 30
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -70,
            style: {
              fontWeight: '200',
              color: 'white'
            }
          },
          startAngle: 0,
          center: ['50%', '50%']
        }
      },
      series: [{
        type: 'pie',
        name: 'Population Ratio',
        innerSize: '70%',
        data: [
          {
            name: 'Loading...',
            y: 25,
            color: '#4db6ac'
          },
          {
            name: 'Loading...',
            y: 25,
            color: '#f06292'
          },
          {
            name: 'Loading...',
            y: 25,
            color: '#ffb74d'
          },
          {
            name: 'Loading...',
            y: 25,
            color: '#9575cd'
          }
          // , {
          //   dataLabels: {
          //     enabled: false
          //   }
          // }
        ]
      }],
      credits: {
        enabled: false
      },
      exporting: { enabled: false }
    };
  }
  ngOnInit() {
    this.generateData();
  }
  generateData() {
    this.chart.push(Highcharts.chart('gender', this.genderObj));
    this.chart.push(Highcharts.chart('mood', this.moodObj));

    this.generateDonutData();
  }
  generateDonutData() {
    this.updateService.fbDataUpdated.subscribe((data) => {
      console.log(data[0]);
      const genderDonutData = [
                              {
                                name: 'Male',
                                y: data[0].malePerc,
                                color: '#4db6ac'
                              },
                              {
                                name: 'Female',
                                y: data[0].femalePerc,
                                color: '#f06292'
                              }
                            ];
      this.chart[0].update({ series: { data: genderDonutData } });

      const moodDonutData = [
                            {
                              name: 'Happy',
                              y: data[1].happyPerc,
                              color: '#4db6ac'
                            },
                            {
                              name: 'Neutral',
                              y: data[1].neutralPerc,
                              color: '#f06292'
                            },
                            {
                              name: 'Angry',
                              y: data[1].angryPerc,
                              color: '#ffb74d'
                            },
                            {
                              name: 'Sad',
                              y: data[1].sadPerc,
                              color: '#9575cd'
                            }
                          ];
      this.chart[1].update({ series: { data: moodDonutData } });

    });
  }

}
