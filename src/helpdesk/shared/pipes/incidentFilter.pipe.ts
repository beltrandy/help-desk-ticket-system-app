import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incidentFilter'
})
export class IncidentFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();
        return items.filter( it => {
            return (
                it.description.toLowerCase().includes(searchText) || it.workNotes.toLowerCase().includes(searchText) || it.caller.toLowerCase().includes(searchText) || it.status.toLowerCase().includes(searchText) || it.closeNotes.toLowerCase().includes(searchText) || it.title.toLowerCase().includes(searchText)); 
        });
    }
}