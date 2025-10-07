INSERT INTO appointment_type (title, type, price, discount, description, price_after_discount)
VALUES ('Standard Check-up', 'normal', 50.00, 0.00, 'A regular, non-urgent consultation.', 50.00),('Critical Emergency Visit', 'emergency', 250.00, 10, 'Immediate care for life-threatening situations.', 225.00),('Urgent Same-Day Care', 'urgent', 150.00, 20, 'Care needed within 24 hours, but not life-threatening.', 120.00)


INSERT INTO appointment_type (title, type, price, discount, description, price_after_discount)
VALUES ('Critical Emergency Visit', 'emergency', 250.00, 10, 'Immediate care for life-threatening situations.', 225.00);


INSERT INTO appointment_type (title, type, price, discount, description, price_after_discount)
VALUES ('Urgent Same-Day Care', 'urgent', 150.00, 20, 'Care needed within 24 hours, but not life-threatening.', 120.00);
INSERT INTO appointments (name, phone, slot_id, patient_id, appointment_type_id, reason, status, is_paid, paid_at) VALUES
-- ===================================================================================================================
-- User 7: Ahmed Hassan (Phone: 010 1234 7001)
-- ===================================================================================================================
('Ahmed Hassan', '01012347001', 351, 7, 1, 'Routine medical screening for visa application.', 'pending', FALSE, NULL),
('Ahmed Hassan', '01012347001', 352, 7, 2, 'Accidental chemical spill on hand, seeking immediate care.', 'accepted', TRUE, NOW()),
('Ahmed Hassan', '01012347001', 353, 7, 3, 'Fever lasting over 48 hours, non-emergency.', 'completed', TRUE, NOW() - INTERVAL '3 days'),
('Ahmed Hassan', '01012347001', 354, 7, 1, 'Annual flu vaccination.', 'cancelled', FALSE, NULL),
('Ahmed Hassan', '01012347001', 355, 7, 2, 'Severe asthma attack, need emergency inhaler refill.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 8: Mohamed Ali (Phone: 011 2345 8002)
-- ===================================================================================================================
('Mohamed Ali', '01123458002', 356, 8, 3, 'Need rapid consultation for travel clearance. (Rejected due to incomplete paperwork)', 'rejected', TRUE, NULL),
('Mohamed Ali', '01123458002', 357, 8, 1, 'Standard dental cleaning and check-up.', 'accepted', TRUE, NOW() - INTERVAL '1 hour'),
('Mohamed Ali', '01123458002', 358, 8, 2, 'Sudden loss of sight in one eye.', 'completed', TRUE, NOW() - INTERVAL '1 day'),
('Mohamed Ali', '01123458002', 359, 8, 2, 'Minor burn treatment follow-up.', 'cancelled', TRUE, NOW() - INTERVAL '2 days'),
('Mohamed Ali', '01123458002', 360, 8, 3, 'Routine blood pressure monitoring.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 9: Youssef Khaled (Phone: 012 3456 9003)
-- ===================================================================================================================
('Youssef Khaled', '01234569003', 361, 9, 3, 'Food poisoning symptoms, extreme dehydration.', 'pending', FALSE, NULL),
('Youssef Khaled', '01234569003', 362, 9, 2, 'Urgent request for diagnostic imaging.', 'accepted', TRUE, NOW()),
('Youssef Khaled', '01234569003', 363, 9, 1, 'Consultation for chronic back pain.', 'completed', TRUE, NOW() - INTERVAL '1 week'),
('Youssef Khaled', '01234569003', 364, 9, 2, 'Lost passport and needs emergency medical certificate.', 'cancelled', FALSE, NULL),
('Youssef Khaled', '01234569003', 365, 9, 3, 'Pre-employment health screening.', 'accepted', TRUE, NOW()),

-- ===================================================================================================================
-- User 10: Omar Tarek (Phone: 015 4567 0004)
-- ===================================================================================================================
('Omar Tarek', '01545670004', 366, 10, 1, 'Renewal of contact lens prescription.', 'pending', FALSE, NULL),
('Omar Tarek', '01545670004', 367, 10, 2, 'Motor vehicle accident follow-up, potential internal injuries.', 'accepted', TRUE, NOW()),
('Omar Tarek', '01545670004', 368, 10, 3, 'Severe ear infection requiring antibiotics.', 'completed', TRUE, NOW() - INTERVAL '4 days'),
('Omar Tarek', '01545670004', 369, 10, 1, 'Nutritional advice consultation.', 'cancelled', TRUE, NOW() - INTERVAL '1 day'),
('Omar Tarek', '01545670004', 370, 10, 2, 'Extreme allergic reaction to bee sting.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 11: Nour El-Sherif (Phone: 010 5678 1005)
-- ===================================================================================================================
('Nour El-Sherif', '01056781005', 371, 11, 3, 'Urgent wound dressing change.', 'pending', FALSE, NULL),
('Nour El-Sherif', '01056781005', 372, 11, 1, 'Initial psychiatric evaluation.', 'accepted', TRUE, NOW()),
('Nour El-Sherif', '01056781005', 373, 11, 2, 'Acute chest pain and difficulty breathing.', 'completed', TRUE, NOW() - INTERVAL '2 hours'),
('Nour El-Sherif', '01056781005', 374, 11, 3, 'Need expedited medical report for school.', 'cancelled', FALSE, NULL),
('Nour El-Sherif', '01056781005', 375, 11, 1, 'General physical examination.', 'accepted', TRUE, NOW()),

-- ===================================================================================================================
-- User 12: Sarah Adel (Phone: 011 6789 2006)
-- ===================================================================================================================
('Sarah Adel', '01167892006', 376, 12, 2, 'Suspected fractured ankle from sports injury.', 'pending', TRUE, NULL),
('Sarah Adel', '01167892006', 377, 12, 3, 'Pre-travel booster shots.', 'accepted', TRUE, NOW()),
('Sarah Adel', '01167892006', 378, 12, 1, 'Consultation regarding dietary restrictions.', 'completed', FALSE, NULL),
('Sarah Adel', '01167892006', 379, 12, 2, 'Complications following minor dental surgery.', 'cancelled', TRUE, NOW() - INTERVAL '6 days'),
('Sarah Adel', '01167892006', 380, 12, 3, 'Severe flu symptoms and body aches.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 13: Fatma Ayman (Phone: 012 7890 3007)
-- ===================================================================================================================
('Fatma Ayman', '01278903007', 381, 13, 1, 'General wellness check and lab work.', 'pending', FALSE, NULL),
('Fatma Ayman', '01278903007', 382, 13, 2, 'Wound infection requiring drainage.', 'accepted', TRUE, NOW()),
('Fatma Ayman', '01278903007', 383, 13, 3, 'Follow-up on recent blood test results.', 'completed', TRUE, NOW() - INTERVAL '2 days'),
('Fatma Ayman', '01278903007', 384, 13, 1, 'Request for medical records transfer.', 'cancelled', TRUE, NOW() - INTERVAL '4 hours'),
('Fatma Ayman', '01278903007', 385, 13, 2, 'Uncontrolled severe bleeding from minor cut.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 14: Laila Fathy (Phone: 015 8901 4008)
-- ===================================================================================================================
('Laila Fathy', '01589014008', 386, 14, 3, 'Rapid COVID-19 testing requirement.', 'pending', FALSE, NULL),
('Laila Fathy', '01589014008', 387, 14, 1, 'Annual gynecology exam.', 'accepted', TRUE, NOW()),
('Laila Fathy', '01589014008', 388, 14, 2, 'Suspected overdose or poisoning.', 'completed', TRUE, NOW() - INTERVAL '5 days'),
('Laila Fathy', '01589014008', 389, 14, 3, 'Minor concussion check after a fall. (Rejected, self-assessed as fine)', 'rejected', FALSE, NULL),
('Laila Fathy', '01589014008', 390, 14, 1, 'Long-term pain management consultation.', 'accepted', TRUE, NOW()),

-- ===================================================================================================================
-- User 15: Hana Gamal (Phone: 010 9012 5009)
-- ===================================================================================================================
('Hana Gamal', '01090125009', 391, 15, 2, 'Kidney stone pain requiring immediate attention.', 'pending', TRUE, NULL),
('Hana Gamal', '01090125009', 392, 15, 3, 'Chest cold that is getting worse quickly.', 'accepted', TRUE, NOW()),
('Hana Gamal', '01090125009', 393, 15, 1, 'Skin condition follow-up appointment.', 'completed', FALSE, NULL),
('Hana Gamal', '01090125009', 394, 15, 2, 'Deep laceration on the foot, needs sutures.', 'cancelled', TRUE, NOW() - INTERVAL '1 day'),
('Hana Gamal', '01090125009', 395, 15, 3, 'Prescription renewal and general check.', 'accepted', TRUE, NOW()),

-- ===================================================================================================================
-- User 16: Ziad Ashraf (Phone: 011 0123 6010)
-- ===================================================================================================================
('Ziad Ashraf', '01101236010', 396, 16, 1, 'Initial screening for sleep apnea.', 'pending', FALSE, NULL),
('Ziad Ashraf', '01101236010', 397, 16, 2, 'Workplace injury, suspected spinal damage.', 'accepted', TRUE, NOW()),
('Ziad Ashraf', '01101236010', 398, 16, 3, 'Evaluation of persistent migraine headaches.', 'completed', TRUE, NOW() - INTERVAL '7 days'),
('Ziad Ashraf', '01101236010', 399, 16, 1, 'Routine physical for driving license renewal.', 'cancelled', FALSE, NULL),
('Ziad Ashraf', '01101236010', 400, 16, 2, 'Choking incident follow-up.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 17: Tamer Emad (Phone: 012 1234 7011)
-- ===================================================================================================================
('Tamer Emad', '01212347011', 401, 17, 3, 'Sudden sharp pain in the side, possibly appendix.', 'pending', TRUE, NULL),
('Tamer Emad', '01212347011', 402, 17, 1, 'Dermatology consultation for acne.', 'accepted', TRUE, NOW()),
('Tamer Emad', '01212347011', 403, 17, 2, 'Severe blood loss due to accident at home.', 'completed', TRUE, NOW() - INTERVAL '3 hours'),
('Tamer Emad', '01212347011', 404, 17, 3, 'Stomach flu symptoms needing hydration.', 'cancelled', FALSE, NULL),
('Tamer Emad', '01212347011', 405, 17, 1, 'Follow-up on immunization status.', 'accepted', TRUE, NOW()),

-- ===================================================================================================================
-- User 18: Mariam Hany (Phone: 015 2345 8012)
-- ===================================================================================================================
('Mariam Hany', '01523458012', 406, 18, 2, 'Sudden severe joint swelling and pain. (Rejected due to no specialist available)', 'rejected', FALSE, NULL),
('Mariam Hany', '01523458012', 407, 18, 3, 'Migraine treatment and medication adjustment.', 'accepted', TRUE, NOW()),
('Mariam Hany', '01523458012', 408, 18, 1, 'Routine check-up for elderly patient.', 'completed', FALSE, NULL),
('Mariam Hany', '01523458012', 409, 18, 2, 'Choking hazard ingestion by child.', 'cancelled', TRUE, NOW() - INTERVAL '2 days'),
('Mariam Hany', '01523458012', 410, 18, 3, 'Severe, prolonged coughing fit.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 19: Khaled Hossam (Phone: 010 3456 9013)
-- ===================================================================================================================
('Khaled Hossam', '01034569013', 411, 19, 1, 'General consultation for weight loss.', 'pending', TRUE, NULL),
('Khaled Hossam', '01034569013', 412, 19, 2, 'Severe allergic skin reaction to new medication.', 'accepted', TRUE, NOW()),
('Khaled Hossam', '01034569013', 413, 19, 3, 'Tetanus shot required after stepping on rusty nail.', 'completed', TRUE, NOW() - INTERVAL '8 hours'),
('Khaled Hossam', '01034569013', 414, 19, 1, 'Review of ongoing diabetes management plan.', 'cancelled', FALSE, NULL),
('Khaled Hossam', '01034569013', 415, 19, 2, 'High-velocity impact injury from falling object.', 'accepted', TRUE, NOW()),

-- ===================================================================================================================
-- User 20: Ghada Magdy (Phone: 011 4567 0014)
-- ===================================================================================================================
('Ghada Magdy', '01145670014', 416, 20, 3, 'Stitches removal post-op.', 'pending', FALSE, NULL),
('Ghada Magdy', '01145670014', 417, 20, 1, 'Routine check-up for thyroid issues.', 'accepted', TRUE, NOW()),
('Ghada Magdy', '01145670014', 418, 20, 2, 'Sudden onset of temporary paralysis.', 'completed', TRUE, NOW() - INTERVAL '1 day'),
('Ghada Magdy', '01145670014', 419, 20, 3, 'Urgent need for backdated sick note.', 'cancelled', TRUE, NOW() - INTERVAL '3 days'),
('Ghada Magdy', '01145670014', 420, 20, 1, 'Discussion of long-term rehabilitation plan.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 21: Amira Ramy (Phone: 012 5678 1015)
-- ===================================================================================================================
('Amira Ramy', '01256781015', 421, 21, 2, 'Severe nausea and vomiting, can''t keep fluids down.', 'pending', FALSE, NULL),
('Amira Ramy', '01256781015', 422, 21, 3, 'Evaluation of recent recurring dizziness.', 'accepted', TRUE, NOW()),
('Amira Ramy', '01256781015', 423, 21, 1, 'General vision test and prescription.', 'completed', TRUE, NOW() - INTERVAL '4 days'),
('Amira Ramy', '01256781015', 424, 21, 2, 'Animal bite requiring rabies prophylaxis. (Rejected, specialized clinic needed)', 'rejected', FALSE, NULL),
('Amira Ramy', '01256781015', 425, 21, 3, 'Unexplained weight loss consultation.', 'accepted', TRUE, NOW()),

-- ===================================================================================================================
-- User 22: Sherif Wahba (Phone: 015 6789 2016)
-- ===================================================================================================================
('Sherif Wahba', '01567892016', 426, 22, 1, 'Routine physical for university admission.', 'pending', TRUE, NULL),
('Sherif Wahba', '01567892016', 427, 22, 2, 'Possible internal bleeding after severe fall.', 'accepted', TRUE, NOW()),
('Sherif Wahba', '01567892016', 428, 22, 3, 'Urgent follow-up on abnormal lab results.', 'completed', TRUE, NOW() - INTERVAL '2 days'),
('Sherif Wahba', '01567892016', 429, 22, 1, 'Check-up for persistent cough.', 'cancelled', TRUE, NOW() - INTERVAL '1 hour'),
('Sherif Wahba', '01567892016', 430, 22, 2, 'Dislocated shoulder needing immediate reduction.', 'accepted', FALSE, NULL),

-- ===================================================================================================================
-- User 23: Samar Wael (Phone: 010 7890 3017)
-- ===================================================================================================================
('Samar Wael', '01078903017', 431, 23, 3, 'Sudden vision changes and dizziness.', 'pending', FALSE, NULL),
('Samar Wael', '01078903017', 432, 23, 1, 'Annual preventative health screen.', 'accepted', TRUE, NOW()),
('Samar Wael', '01078903017', 433, 23, 2, 'Suspected heart attack, acute chest pain.', 'completed', TRUE, NOW() - INTERVAL '1 day'),
('Samar Wael', '01078903017', 434, 23, 3, 'Severe, prolonged toothache needing extraction referral.', 'cancelled', FALSE, NULL),
('Samar Wael', '01078903017', 435, 23, 1, 'Review of medication for anxiety.', 'accepted', TRUE, NOW());
select * from appointment_type
select * from users