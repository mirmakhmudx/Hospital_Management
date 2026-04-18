<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Rolelar
        $admin = Role::create(['name' => 'admin']);
        $doctor = Role::create(['name' => 'doctor']);
        $receptionist = Role::create(['name' => 'receptionist']);

        // Permissionlar
        $permissions = [
            'view patients', 'create patients', 'edit patients', 'delete patients',
            'view doctors', 'create doctors', 'edit doctors', 'delete doctors',
            'view appointments', 'create appointments', 'edit appointments', 'delete appointments',
            'view medical-records', 'create medical-records', 'edit medical-records', 'delete medical-records',
            'view billings', 'create billings', 'edit billings', 'delete billings',
            'view rooms', 'create rooms', 'edit rooms', 'delete rooms',
        ];

        foreach ($permissions as $perm) {
            Permission::create(['name' => $perm]);
        }

        // Admin — hammasi
        $admin->givePermissionTo(Permission::all());

        // Doctor — ko'rish va medical records
        $doctor->givePermissionTo([
            'view patients',
            'view appointments', 'edit appointments',
            'view medical-records', 'create medical-records', 'edit medical-records',
        ]);

        // Receptionist — qabul va bemorlar
        $receptionist->givePermissionTo([
            'view patients', 'create patients', 'edit patients',
            'view appointments', 'create appointments', 'edit appointments',
            'view billings', 'create billings',
            'view rooms',
        ]);
    }
}
