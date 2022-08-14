<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class RepairsTool
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int $repairs_id
 * @property int $users_id
 * @property int|null $priorities_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Priority|null $priority
 * @property Repair $repair
 * @property User $user
 *
 * @package App\Models
 */
class RepairsTool extends Model
{
	use SoftDeletes;
	protected $table = 'repairs_tools';

	protected $casts = [
		'repairs_id' => 'int',
		'users_id' => 'int',
		'priorities_id' => 'int'
	];

	protected $fillable = [
		'name',
		'description',
		'repairs_id',
		'users_id',
		'priorities_id'
	];

	public function priority()
	{
		return $this->belongsTo(Priority::class, 'priorities_id');
	}

	public function repair()
	{
		return $this->belongsTo(Repair::class, 'repairs_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id');
	}
}
