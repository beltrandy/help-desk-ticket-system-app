import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dashboardFilter'
})
export class DashboardFilterPipe implements PipeTransform {
    transform(items: any[], role: string, uid: string): any[] {
        
        if (!items) return [];

        if (role === 'caller') {
            return items.filter( item => {
                return item.caller === uid;
            });
        } else {
            return items.filter( item => {
                return item.agent === uid;
            });
        }
        
    }
}