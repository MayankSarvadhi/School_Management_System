/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '../../models';
import { Op } from 'sequelize';

class PrincipalDashboardController {

    async TotalCountRecord(req, res, next) {
        const data = await db.StudentDetailsSchema.count();
        const teacherData = await db.UsersSchema.count({ where: { Role: 'Teacher' }});
        const maleCount = await db.StudentDetailsSchema.count({ where: { Gender: 'Male' }});
        const femaleCount = await db.StudentDetailsSchema.count({ where: { Gender: 'Female' }});

        const malePercentage = Number(((maleCount / data) * 100).toFixed(2));
        const femalePercentage = Number(((femaleCount / data) * 100).toFixed(2));
        const Total = {
            totalTeacher: teacherData,
            totalStudent: data,
            totalMale: malePercentage,
            totalFemale: femalePercentage
        };
        return res.status(200).json({ success: true, statusCode: 200, Total, message: 'Data Fetch SuccessFully' });
    }

    async AttendanceData(req, res, next) {
        const { year } = req.body;
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);

        const attendanceData = await db.AttendanceSchema.findAll({
            where: {
                Date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        const monthlyAttendance = Array(12).fill(null);
        let month;
        const arr = [];
        attendanceData.forEach(attendance => {
            month = new Date(attendance.Date).getMonth();
            arr.push(month);
            if (!monthlyAttendance[month]) {
                monthlyAttendance[month] = { present: 0, absent: 0 };

            }
            if (attendance.Status === 'present') {
                monthlyAttendance[month].present++;
            } else if (attendance.Status === 'absent') {
                monthlyAttendance[month].absent++;
            }
        });

        for (let index = 0; index < 12; index++) {
            if (!arr.includes(index)) {
                monthlyAttendance[index] = { present: 0, absent: 0 };
            }
        }
        return res.status(200).json({ success: true, statusCode: 200, monthlyAttendance, message: 'Data Fetch SuccessFully' });
    }

}

export const PrincipalController = new PrincipalDashboardController();