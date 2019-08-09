export default [
    {
        taskID: 1,
        taskName: 'Planning',
        startDate: '2/17/2012',
        endDate: '2/17/2012',
        progress: 100,
        duration: 5,
        priority: 'Normal',
        approved: false,
        subtasks: [
            { taskID: 2, taskName: 'Plan timeline', startDate: '2/17/2012',
                endDate: '2/17/2012', duration: 5, progress: 100, priority: 'Normal', approved: false },
            { taskID: 3, taskName: 'Plan budget', startDate: '2/17/2012',
                endDate: '2/17/2012', duration: 5, progress: 100, priority: 'Low', approved: true },
            { taskID: 4, taskName: 'Allocate resources', startDate: '2/17/2012',
                endDate: '2/17/2012', duration: 5, progress: 100, priority: 'Critical', approved: false },
            { taskID: 5, taskName: 'Planning complete', startDate: '2/17/2012',
                endDate: '2/17/2012', duration: 0, progress: 0, priority: 'Low', approved: true }
        ]
    },
    {
        taskID: 6,
        taskName: 'Design',
        startDate: '2/17/2012',
        endDate: '2/17/2012',
        duration: 3,
        progress: 86,
        priority: 'High',
        approved: false,
        subtasks: [
            { taskID: 7, taskName: 'Software Specification', startDate: '2/17/2012',
                endDate: '2/17/201', duration: 3, progress: 60, priority: 'Normal', approved: false },
            { taskID: 8, taskName: 'Develop prototype', startDate: '2/17/2012',
                endDate: '2/17/201', duration: 3, progress: 100, priority: 'Critical', approved: false },
            { taskID: 9, taskName: 'Get approval from customer', startDate: '2/17/2012',
                endDate: '2/17/2012', duration: 2, progress: 100, priority: 'Low', approved: true },
            { taskID: 10, taskName: 'Design Documentation', startDate: '2/17/2012',
                endDate: '2/17/2012', duration: 2, progress: 100, priority: 'High', approved: true },
            { taskID: 11, taskName: 'Design complete', startDate: '2/17/2012',
                endDate: '2/17/2012', duration: 0, progress: 0, priority: 'Normal', approved: true }
        ]
    },
    {
        taskID: 12,
        taskName: 'Implementation Phase',
        startDate: '2/17/2012',
        endDate: '2/17/2012',
        priority: 'Normal',
        approved: false,
        duration: 11,
        progress: 66,
        subtasks: [
            {
                taskID: 13,
                taskName: 'Phase 1',
                startDate: '2/17/2012',
                endDate: '2/17/2012',
                priority: 'High',
                approved: false,
                progress: 50,
                duration: 11,
                subtasks: [{
                        taskID: 14,
                        taskName: 'Implementation Module 1',
                        startDate: '2/17/2012',
                        endDate: '2/17/2012',
                        priority: 'Normal',
                        duration: 11,
                        progress: 10,
                        approved: false,
                        subtasks: [
                            { taskID: 15, taskName: 'Development Task 1', startDate: '2/17/2012',
                                endDate: '2/17/201', duration: 3, progress: '50', priority: 'High', approved: false },
                            { taskID: 16, taskName: 'Development Task 2', startDate: '2/17/2012',
                                endDate: '2/17/201', duration: 3, progress: '50', priority: 'Low', approved: true },
                            { taskID: 17, taskName: 'Testing', startDate: '2/17/201',
                                endDate: '2/17/201', duration: 2, progress: '0', priority: 'Normal', approved: true },
                            { taskID: 18, taskName: 'Bug fix', startDate: '2/17/201',
                                endDate: '2/17/201', duration: 2, progress: '0', priority: 'Critical', approved: false },
                            { taskID: 19, taskName: 'Customer review meeting', startDate: '2/17/201',
                                endDate: '2/17/2012', duration: 2, progress: '0', priority: 'High', approved: false },
                            { taskID: 20, taskName: 'Phase 1 complete', startDate: '2/17/2012',
                                endDate: '2/17/2012', duration: 0, progress: '50', priority: 'Low', approved: true }
                        ]
                    }]
            },
            {
                taskID: 21,
                taskName: 'Phase 2',
                startDate: '2/17/2012',
                endDate: '2/17/201',
                priority: 'High',
                approved: false,
                duration: 12,
                progress: 60,
                subtasks: [{
                        taskID: 22,
                        taskName: 'Implementation Module 2',
                        startDate: '2/17/2012',
                        endDate: '2/17/201',
                        priority: 'Critical',
                        approved: false,
                        duration: 12,
                        progress: 90,
                        subtasks: [
                            { taskID: 23, taskName: 'Development Task 1', startDate: '2/17/2012',
                                endDate: '2/17/201', duration: 4, progress: '50', priority: 'Normal', approved: true },
                            { taskID: 24, taskName: 'Development Task 2', startDate: '2/17/2012',
                                endDate: '2/17/201', duration: 4, progress: '50', priority: 'Critical', approved: true },
                            { taskID: 25, taskName: 'Testing', startDate: '2/17/201',
                                endDate: '2/17/201', duration: 2, progress: '0', priority: 'High', approved: false },
                            { taskID: 26, taskName: 'Bug fix', startDate: '2/17/201',
                                endDate: '2/17/201', duration: 2, progress: '0', priority: 'Low', approved: false },
                            { taskID: 27, taskName: 'Customer review meeting', startDate: '2/17/2012',
                                endDate: '2/17/201', duration: 2, progress: '0', priority: 'Critical', approved: true },
                            { taskID: 28, taskName: 'Phase 2 complete', startDate: '2/17/201',
                                endDate: '2/17/201', duration: 0, progress: '50', priority: 'Normal', approved: false }
                        ]
                    }]
            },
            {
                taskID: 29,
                taskName: 'Phase 3',
                startDate: '2/17/2012',
                endDate: '2/17/2012',
                priority: 'Normal',
                approved: false,
                duration: 11,
                progress: 30,
                subtasks: [{
                        taskID: 30,
                        taskName: 'Implementation Module 3',
                        startDate: '2/17/2012',
                        endDate: '2/17/2012',
                        priority: 'High',
                        approved: false,
                        duration: 11,
                        progress: 60,
                        subtasks: [
                            { taskID: 31, taskName: 'Development Task 1', startDate: '2/17/2012',
                                endDate: '2/17/201', duration: 3, progress: '50', priority: 'Low', approved: true },
                            { taskID: 32, taskName: 'Development Task 2', startDate: '2/17/2012',
                                endDate: '2/17/201', duration: 3, progress: '50', priority: 'Normal', approved: false },
                            { taskID: 33, taskName: 'Testing', startDate: '2/17/201',
                                endDate: '2/17/201', duration: 2, progress: '0', priority: 'Critical', approved: true },
                            { taskID: 34, taskName: 'Bug fix', startDate: '2/17/201',
                                endDate: '2/17/201', duration: 2, progress: '0', priority: 'High', approved: false },
                            { taskID: 35, taskName: 'Customer review meeting', startDate: '2/17/201',
                                endDate: '2/17/2012', duration: 2, progress: '0', priority: 'Normal', approved: true },
                            { taskID: 36, taskName: 'Phase 3 complete', startDate: '2/17/2012',
                                endDate: '2/17/2012', duration: 0, progress: '50', priority: 'Critical', approved: false },
                        ]
                    }]
            }
        ]
    }
];