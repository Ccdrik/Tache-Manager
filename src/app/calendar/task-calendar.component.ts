import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarView } from 'angular-calendar';
import { TaskService, Task } from '../services/task.service';
import { isSameDay, startOfDay } from 'date-fns';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CalendarEvent } from 'angular-calendar';

registerLocaleData(localeFr);

@Component({
  selector: 'app-task-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.scss']
})
export class TaskCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    const tasks: Task[] = this.taskService.getTasks();

    this.events = tasks
      .filter(task => task.date)
      .map(task => ({
        title: task.titre,
        start: new Date(task.date!),
        allDay: true,
        color: {
          primary: task.faite ? '#28a745' : '#dc3545',
          secondary: '#fdf1f1'
        }
      }));
  }
}
