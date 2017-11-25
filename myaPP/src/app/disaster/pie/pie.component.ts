import { Component } from '@angular/core';
import * as G2 from '@antv/g2';
import * as DataSet from '@antv/data-set';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-disaster-pie',
  templateUrl: './pie.component.html',
//   styleUrls: ['./app.component.css']
})
export class PieComponent implements OnInit {

  title = 'app';
  ngOnInit(): void {
    const { DataView } = DataSet;
    const data = [
      { item: '事例一', count: 40 },
      { item: '事例二', count: 21 },
      { item: '事例三', count: 17 },
      { item: '事例四', count: 13 },
      { item: '事例五', count: 9 }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    const chart = new G2.Chart({
      container: 'c2',
      forceFit: true,
      height: window.innerHeight,
    });
    chart.source(dv, {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    });
    chart.coord('theta');
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart.intervalStack()
      .position('percent')
      .color('item')
      .label('percent', {
        offset: -40,
        // autoRotate: false,
        textStyle: {
          rotate: 0,
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      })
      .tooltip('item*percent', (item, percent) => {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  }
}
