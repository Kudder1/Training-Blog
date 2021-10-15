import { useState } from "react";
import { firestore } from 'index'
import { trainingWeek, activity } from "types/ContentTypes";
import { doc, updateDoc } from "@firebase/firestore";

export const WithWeek = (Component: any) => {
    const WithWeekComponent = () => {
        const [week, setWeek] = useState<trainingWeek | null>(null);

        const postCompleted = async (completed: number, name: string) => {
            const activity = week!.activities.find(activity => activity.name === name) as activity
            const updatedActivity = { ...activity, completed: activity.completed + completed }
            const updatedActivities = week!.activities.map((activity: activity) => activity.name === updatedActivity.name ? updatedActivity : activity) as activity[]
            setWeek({ ...week!, activities: updatedActivities})
            await updateDoc(doc(firestore, 'weeks', week!.id), {activities: updatedActivities})
        }
        const postPlanned = async (planned: number, name: string) => {
            const activity = week!.activities.find(activity => activity.name === name) as activity
            const updatedActivity = { ...activity, planned }
            const updatedActivities = week!.activities.map((activity) => activity.name === updatedActivity.name ? updatedActivity : activity)
            setWeek({ ...week!, activities: updatedActivities})
            await updateDoc(doc(firestore, 'weeks', week!.id), {activities: updatedActivities})
        }

      return (
        <Component
            week={week}
            setWeek={setWeek}
            postPlanned={postPlanned}
            postCompleted={postCompleted}
        />
      )
    }
    return WithWeekComponent;
}